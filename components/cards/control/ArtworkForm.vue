<template>
  <v-card-text>
    <h2 class="pa-3">{{ $t("card.edit.artwork") }}</h2>
    <DropFileUpload
      @upload="onUpload"
      :prompt="$t('card.edit.imageUploadPrompt')"
    />
    <h3>{{ $t("card.edit.customize") }}</h3>
    <v-switch
      v-model="useCropped"
      class="mx-2"
      :label="$t('card.edit.enableCropping')"
    ></v-switch>
    <transition name="fade" mode="in-out">
      <v-container v-show="useCropped" class="cropper-container">
        <vue-cropper
          ref="cropper"
          class="cropper"
          :viewMode="1"
          :autoCropArea="1.0"
          :responsive="false"
          :aspectRatio="aspectRatio"
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

import {
  artworkWidth,
  artworkHeight,
  minionArtworkWidth,
  minionArtworkHeight,
} from "~/assets/src/constants";
import EventBus from "~/assets/src/events/bus";
import { BackgroundState } from "~/store/background";
import { TabId } from "~/store/sidebar";

@Component({
  watch: {
    activeTab(newValue: TabId, oldValue: TabId) {
      if (newValue === TabId.ARTWORK) {
        (this as ArtworkForm).restoreCropperSettings();
      }
    },
  },
})
export default class ArtworkForm extends Vue {
  invalidate: boolean = true;
  replaceImage: boolean = true;
  reloaded: boolean = true;

  get isKrosmaster(): boolean {
    return this.$store.state.krosmaster.type !== "minion";
  }

  get activeTab(): TabId {
    return this.$store.state.sidebar.activeTab;
  }

  get useCropped(): boolean {
    return this.$store.state.background.useCropped;
  }

  set useCropped(useCropped: boolean) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("background/setCropping", useCropped);
    this.restoreCropperSettings();
  }

  get aspectRatio(): number {
    return this.isKrosmaster
      ? artworkWidth / artworkHeight
      : minionArtworkWidth / minionArtworkHeight;
  }

  private get cropper(): Cropper & Vue {
    return this.$refs.cropper as any as Cropper & Vue;
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
    const backgroundState = this.$store.state.background;
    if (!backgroundState.useCropped) return;
    if (this.replaceImage) {
      // This has to be done when the cropper is displayed to correctly update the size.
      // That's why the image is not replaced immediately on background-cropping event.
      this.replaceImage = false;
      this.cropper.replace(backgroundState.original);
      return;
    }
    if (this.invalidate) {
      this.invalidate = false;
      this.cropper.setAspectRatio(this.aspectRatio);
      const cropperData = backgroundState.cropper;
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
        this.$store.commit("export/setDirty", true);
        this.$store.commit("background/crop", image);
        this.$store.commit("background/setCropperData", cropper);
      }
    },
    150 // ms
  );

  onUpload(image: string) {
    // Cropper has to be displayed in order to calculate the correct height:
    this.useCropped = true;

    this.$store.commit("export/setDirty", true);
    this.$store.commit("background/upload", image);
    this.cropper.replace(image);
    this.$emit("focus");
    this.$store.commit("notification/add", {
      message: "card.edit.notification.artworkUpload",
    });
  }

  onCrop() {
    if (this.invalidate) {
      this.restoreCropperSettings();
      if (this.$store.state.background.cropper != null) {
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
</style>

<style lang="scss" scoped>
h1 {
  padding: 0.6em;
  padding-bottom: 1em;
}

h3 {
  padding: 1.5em 0em 0em 0.8em;
}

.cropper-container {
  background-color: #121212;
  border-radius: 10px;

  .cropper {
    max-width: 370px;
    min-height: 200px;
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
