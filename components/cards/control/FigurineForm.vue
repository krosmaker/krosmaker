<template>
  <v-card-text>
    <h1>Figurine</h1>
    <DropFileUpload @upload="onUpload" />

    <h3>Customize</h3>
    <v-row>
      <v-col class="pa-0" cols="12" sm="6">
        <v-slider
          class="fixed-label-slider"
          dense
          label="X"
          v-model="offsetX"
          min="645"
          max="815"
        ></v-slider>
      </v-col>
      <v-col class="pa-0" cols="12" sm="6">
        <v-slider
          class="fixed-label-slider"
          dense
          label="Y"
          v-model="offsetY"
          min="-140"
          max="160"
        ></v-slider>
      </v-col>
      <v-col class="pa-0" cols="12" sm="12">
        <v-slider
          class="fixed-label-slider"
          dense
          label="Size"
          v-model="height"
          min="55"
          max="295"
        ></v-slider>
      </v-col>
      <v-col class="crop-switch" cols="12" sm="12">
        <v-switch
          v-model="useCropped"
          class="mx-2"
          label="Enable cropping"
        ></v-switch>
      </v-col>
    </v-row>
    <transition name="fade" mode="in-out">
      <v-container v-show="useCropped" class="cropper-container">
        <vue-cropper
          ref="cropper"
          class="cropper"
          dragMode="move"
          :view-mode="1"
          :responsive="false"
          :autoCropArea="1.0"
          :src="$store.state.figurine.original"
          @crop="onCrop"
        >
        </vue-cropper>
      </v-container>
    </transition>
  </v-card-text>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { debounce } from "vue-debounce";
import Cropper from "cropperjs";

import { cardWidth, cardHeight } from "~/assets/src/constants";
import EventBus from "~/assets/src/events/bus";
import { FigurineState } from "~/store/figurine";
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
export default class FigurineForm extends Vue {
  invalidate: boolean = true;
  replaceImage: boolean = false;

  get activeTab(): TabId {
    return this.$store.state.sidebar.activeTab;
  }

  get height(): number {
    return this.$store.state.figurine.height;
  }

  set height(height: number) {
    this.$store.commit("figurine/setHeight", height);
  }

  get offsetX(): number {
    return this.$store.state.figurine.offsetX;
  }

  set offsetX(offsetX: number) {
    this.$store.commit("figurine/setOffsetX", offsetX);
  }

  get offsetY(): number {
    return this.$store.state.figurine.offsetY;
  }

  set offsetY(offsetY: number) {
    this.$store.commit("figurine/setOffsetY", offsetY);
  }

  get useCropped(): boolean {
    return this.$store.state.figurine.useCropped;
  }

  set useCropped(useCropped: boolean) {
    this.$store.commit("figurine/setCropping", useCropped);
  }

  mounted() {
    EventBus.$on("card-load", () => {
      this.invalidate = true;
      this.replaceImage = true;
    });
  }

  private restoreCropperSettings() {
    const figurineState = this.$store.state.figurine;
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
      const image = cropper.getCroppedCanvas().toDataURL("image/png");
      this.$store.commit("figurine/crop", image);
      this.$store.commit("figurine/setCropperData", cropper);
    },
    150 // ms
  );

  private get cropper(): Cropper & Vue {
    return (this.$refs.cropper as any) as Cropper & Vue;
  }

  get aspectRatio(): number {
    return cardWidth / cardHeight;
  }

  onUpload(image: string) {
    // Cropper has to be displayed in order to calculate the correct height:
    this.useCropped = true;

    this.$store.commit("figurine/upload", image);
    this.cropper.replace(image);
    this.$emit("focus");
  }

  onCrop() {
    if (this.invalidate) {
      this.restoreCropperSettings();
      if (this.$store.state.background.cropper != null) {
        // It was necessary to restore the cropper state. Crop image change is ignored.
        return;
      }
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
h1 {
  padding: 0.6em;
  padding-bottom: 1em;
}

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.crop-switch {
  margin-top: -1em;
  padding: 0;
}
</style>
