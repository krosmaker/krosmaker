<template>
  <v-card-text>
    <FormHeader title="card.edit.figurine" />
    <v-row class="mb-2 ml-2">
      <v-switch v-model="useSameImage" :label="$t('card.edit.useSameImage')" />
    </v-row>
    <v-fade-transition>
      <div v-if="!useSameImage">
        <DropFileUpload
          @upload="onUpload"
          :prompt="$t('card.edit.imageUploadPrompt')"
        />

        <h3>{{ $t("card.edit.customize") }}</h3>
        <v-row>
          <v-col class="pa-0" cols="6">
            <v-slider
              class="fixed-label-slider mr-2"
              dense
              v-model="offsetX"
              min="645"
              max="815"
            >
              <template v-slot:prepend>
                <v-icon :color="sliderIconColor">mdi-pan-horizontal</v-icon>
              </template>
            </v-slider>
          </v-col>
          <v-col class="pa-0" cols="6">
            <v-slider
              class="fixed-label-slider mr-4"
              dense
              v-model="offsetY"
              min="-140"
              max="160"
            >
              <template v-slot:prepend>
                <v-icon :color="sliderIconColor">mdi-pan-vertical</v-icon>
              </template>
            </v-slider>
          </v-col>
          <v-col class="pa-0" cols="12">
            <v-slider
              class="fixed-label-slider mr-4"
              dense
              v-model="height"
              min="110"
              max="590"
            >
              <template v-slot:prepend>
                <v-icon :color="sliderIconColor">mdi-resize</v-icon>
              </template>
            </v-slider>
          </v-col>
          <v-col class="crop-switch" cols="12">
            <v-switch
              v-model="useCropped"
              class="mx-2"
              :label="$t('card.edit.enableCropping')"
            ></v-switch>
          </v-col>
        </v-row>
      </div>
    </v-fade-transition>
    <v-fade-transition>
      <v-container
        v-show="!useSameImage && useCropped"
        class="cropper-container"
      >
        <vue-cropper
          ref="cropper"
          class="cropper"
          dragMode="move"
          :view-mode="1"
          :responsive="false"
          :autoCropArea="1.0"
          @crop="onCrop"
        >
        </vue-cropper>
      </v-container>
    </v-fade-transition>
  </v-card-text>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import AbstractFigurineForm from "~/components/cards/control/AbstractFigurineForm.vue";
import { FigurineState, hasDefaultPlacementSettings } from "~/store/figurine";
import { ReverseFigurineState } from "~/store/reverseFigurine";
import { TabId } from "~/store/sidebar";

@Component({
  watch: {
    activeTab(newValue: TabId, oldValue: TabId) {
      if (newValue === TabId.ARTWORK) {
        (this as ReverseFigurineForm).restoreCropperSettings();
      }
    },
  },
})
export default class ReverseFigurineForm extends AbstractFigurineForm {
  constructor() {
    super();
    this.figurineStore = "reverseFigurine";
  }

  get useSameImage(): boolean {
    return (this.figurine as ReverseFigurineState).useSameImage;
  }

  set useSameImage(useSameImage: boolean) {
    this.setDirty();
    this.commit("setUseSameImage", useSameImage);
    if (!useSameImage) {
      if (hasDefaultPlacementSettings(this.figurine)) {
        const frontFigurine: FigurineState = this.$store.state.figurine;
        this.commit("setHeight", frontFigurine.height);
        this.commit("setOffsetX", frontFigurine.offsetX);
        this.commit("setOffsetY", frontFigurine.offsetY);
      }

      this.invalidate = true;
      this.replaceImage = true;
      this.reloaded = true;
      this.restoreCropperSettings();
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  padding-top: 1.5em;
  padding-left: 0.8em;
  padding-bottom: 1.5em;
}

.cropper-container {
  background-color: #121212;
  border-radius: 10px;

  .cropper {
    max-width: 370px;
    min-height: 100px;
    max-height: 250px;
  }
}

.crop-switch {
  margin-top: -1em;
  padding: 0;
}
</style>
