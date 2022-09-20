<template>
  <v-card-text>
    <FormHeader title="card.edit.figurine" />
    <FighterOnlyForm>
      <DropFileUpload
        @upload="onUpload"
        :prompt="$t('card.edit.imageUploadPrompt')"
      />

      <h3>{{ $t("card.edit.customize") }}</h3>
      <v-row>
        <v-col class="pa-0" cols="6">
          <v-slider
            class="fixed-label-slider"
            dense
            v-model="offsetX"
            min="645"
            max="815"
          >
            <template v-slot:prepend>
              <v-icon :color="sliderIconColor"> mdi-pan-horizontal </v-icon>
            </template>
          </v-slider>
        </v-col>
        <v-col class="pa-0" cols="6">
          <v-slider
            class="fixed-label-slider"
            dense
            v-model="offsetY"
            min="-140"
            max="160"
          >
            <template v-slot:prepend>
              <v-icon :color="sliderIconColor"> mdi-pan-vertical </v-icon>
            </template>
          </v-slider>
        </v-col>
        <v-col class="pa-0" cols="12">
          <v-slider
            class="fixed-label-slider"
            dense
            v-model="height"
            min="110"
            max="590"
          >
            <template v-slot:prepend>
              <v-icon :color="sliderIconColor"> mdi-resize </v-icon>
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
    </FighterOnlyForm>
    <v-fade-transition>
      <v-container v-show="isFighter && useCropped" class="cropper-container">
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
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { debounce } from "vue-debounce";
import Cropper from "cropperjs";

import AbstractForm from "~/components/cards/control/AbstractForm";
import {
  cardWidth,
  cardHeight,
  minionCardWidth,
  minionCardHeight,
} from "~/assets/src/constants";
import EventBus from "~/assets/src/events/bus";
import { TabId } from "~/store/sidebar";

@Component({
  watch: {
    activeTab(newValue: TabId, oldValue: TabId) {
      if (newValue === TabId.FIGURINE) {
        (this as FigurineForm).restoreCropperSettings();
      }
    },
  },
})
export default class FigurineForm extends AbstractForm {
  invalidate: boolean = true;
  replaceImage: boolean = true;
  reloaded: boolean = true;
  sliderIconColor: string = "#777777";

  get activeTab(): TabId {
    return this.$store.state.sidebar.activeTab;
  }

  get height(): number {
    return this.$store.state.figurine.height;
  }

  set height(height: number) {
    this.setDirty();
    this.$store.commit("figurine/setHeight", height);
  }

  get offsetX(): number {
    return this.$store.state.figurine.offsetX;
  }

  set offsetX(offsetX: number) {
    this.setDirty();
    this.$store.commit("figurine/setOffsetX", offsetX);
  }

  get offsetY(): number {
    return this.$store.state.figurine.offsetY;
  }

  set offsetY(offsetY: number) {
    this.setDirty();
    this.$store.commit("figurine/setOffsetY", offsetY);
  }

  get useCropped(): boolean {
    return this.$store.state.figurine.useCropped;
  }

  set useCropped(useCropped: boolean) {
    this.setDirty();
    this.$store.commit("figurine/setCropping", useCropped);
    this.restoreCropperSettings();
  }

  mounted() {
    this.restoreCropperSettings();
    EventBus.$on("card-load", () => {
      this.invalidate = true;
      this.replaceImage = true;
      this.reloaded = true;
    });
  }

  private restoreCropperSettings() {
    const figurineState = this.$store.state.figurine;
    if (!figurineState.useCropped) return;
    if (this.replaceImage) {
      // This has to be done when the cropper is displayed to correctly update the size.
      // That's why the image is not replaced immediately on background-cropping event.
      this.replaceImage = false;
      this.cropper.replace(figurineState.original);
      return;
    }
    if (this.invalidate) {
      this.invalidate = false;
      const cropperData = figurineState.cropper;
      if (cropperData != null) {
        this.cropper.setCanvasData(cropperData.canvasData);
        this.cropper.setData(cropperData.croppingData);
      }
    }
  }

  private updateCroppedImage: (cropper: Cropper) => void = debounce(
    (cropper: Cropper) => {
      if (this.reloaded) {
        this.reloaded = false;
      } else {
        const image = cropper.getCroppedCanvas().toDataURL("image/png");
        this.setDirty();
        this.$store.commit("figurine/crop", image);
        this.$store.commit("figurine/setCropperData", cropper);
      }
    },
    150 // ms
  );

  private get cropper(): Cropper & Vue {
    return this.$refs.cropper as any as Cropper & Vue;
  }

  get aspectRatio(): number {
    return this.isKrosmaster
      ? cardWidth / cardHeight
      : minionCardWidth / minionCardHeight;
  }

  onUpload(image: string) {
    // Cropper has to be displayed in order to calculate the correct height:
    this.useCropped = true;

    this.setDirty();
    this.$store.commit("figurine/upload", image);
    this.cropper.replace(image);
    this.$emit("focus");
    this.$store.commit("notification/add", {
      message: "card.edit.notification.figurineUpload",
    });
  }

  onCrop() {
    if (this.invalidate) {
      this.restoreCropperSettings();
      if (this.$store.state.figurine.cropper != null) {
        // It was necessary to restore the cropper state. Crop image change is ignored.
        return;
      }
    } else if (!this.useCropped) {
      return;
    }
    this.updateCroppedImage(this.cropper);
  }
}
</script>

<style lang="scss">
.cropper-bg {
  background-image: initial;
}

.cropper-modal {
  background-color: transparent;
  opacity: 1;
}

.fixed-label-slider {
  label {
    width: 32px;
    text-align: right;
  }
}
</style>

<style lang="scss" scoped>
h3 {
  padding-top: 1.5em;
  padding-left: 0.8em;
  padding-bottom: 1em;
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
