<template>
  <v-card-text>
    <h1>Figurine</h1>
    <DropFileUpload @upload="onUpload" />

    <h3 class="position-header">Position</h3>
    <v-row>
      <v-col cols="12" sm="6">
        <v-slider label="X" v-model="offsetX" min="655" max="805"></v-slider>
      </v-col>
      <v-col cols="12" sm="6">
        <v-slider label="Y" v-model="offsetY" min="-100" max="180"></v-slider>
      </v-col>
      <v-col cols="12" sm="12">
        <v-slider label="Size" v-model="height" min="100" max="260"></v-slider>
      </v-col>
    </v-row>

    <h3>Customize</h3>
    <v-switch
      v-model="useCropped"
      class="mx-2"
      label="Enable cropping"
    ></v-switch>
    <transition name="fade" mode="in-out">
      <v-container v-show="useCropped" class="cropper-container">
        <vue-cropper
          ref="cropper"
          class="cropper"
          dragMode="move"
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

@Component
export default class FigurineForm extends Vue {
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

  private updateCroppedImage: (cropper: Cropper) => void = debounce(
    (cropper: Cropper) => {
      const image = cropper.getCroppedCanvas().toDataURL("image/png");
      this.$store.commit("figurine/crop", image);
    },
    150 // ms
  );

  private get cropper(): Cropper {
    return (this.$refs.cropper as any) as Cropper;
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
</style>

<style lang="scss" scoped>
h1 {
  padding: 0.6em;
  padding-bottom: 1em;
}

h3 {
  padding-left: 0.8em;
}

.position-header {
  padding-top: 1.5em;
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
</style>
