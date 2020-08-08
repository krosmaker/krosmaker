<template>
  <v-card-text>
    <h1>Artwork</h1>
    <DropFileUpload @upload="onUpload" />
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
          :disabled="true"
          :viewMode="1"
          :aspectRatio="aspectRatio"
          :autoCropArea="1.0"
          :responsive="false"
          :src="$store.state.background.original"
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
export default class ArtworkForm extends Vue {
  get useCropped(): boolean {
    return this.$store.state.background.useCropped;
  }

  set useCropped(useCropped: boolean) {
    this.$store.commit("background/setCropping", useCropped);
  }

  private updateCroppedImage: (cropper: Cropper) => void = debounce(
    (cropper: Cropper) => {
      const image = cropper.getCroppedCanvas().toDataURL("image/png");
      this.$store.commit("background/crop", image);
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

    this.$store.commit("background/upload", image);
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
}

h3 {
  padding: 1.5em 0em 0em 0.8em;
}

.cropper-container {
  background-color: #121212;
  border-radius: 10px;

  .cropper {
    max-width: 370px;
    max-height: 400px;
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
