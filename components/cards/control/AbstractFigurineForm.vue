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
import { FigurineState } from "~/store/figurine";

@Component
export default class AbstractFigurineForm extends AbstractForm {
  figurineStore: string = "figurine";
  invalidate: boolean = true;
  replaceImage: boolean = true;
  reloaded: boolean = true;
  sliderIconColor: string = "#777777";

  get figurine(): FigurineState {
    return this.$store.state[this.figurineStore];
  }

  commit(mutation: string, payload?: any) {
    this.$store.commit(`${this.figurineStore}/${mutation}`, payload);
  }

  get activeTab(): TabId {
    return this.$store.state.sidebar.activeTab;
  }

  get height(): number {
    return this.figurine.height;
  }

  set height(height: number) {
    this.setDirty();
    this.commit("setHeight", height);
  }

  get offsetX(): number {
    return this.figurine.offsetX;
  }

  set offsetX(offsetX: number) {
    this.setDirty();
    this.commit("setOffsetX", offsetX);
  }

  get offsetY(): number {
    return this.figurine.offsetY;
  }

  set offsetY(offsetY: number) {
    this.setDirty();
    this.commit("setOffsetY", offsetY);
  }

  get useCropped(): boolean {
    return this.figurine.useCropped;
  }

  set useCropped(useCropped: boolean) {
    this.setDirty();
    this.commit("setCropping", useCropped);
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

  restoreCropperSettings() {
    const figurine = this.figurine;
    if (!figurine.useCropped) return;
    if (this.replaceImage) {
      // This has to be done when the cropper is displayed to correctly update the size.
      // That's why the image is not replaced immediately on background-cropping event.
      this.replaceImage = false;
      this.cropper.replace(figurine.original);
      return;
    }
    if (this.invalidate) {
      this.invalidate = false;
      const cropperData = figurine.cropper;
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
        this.commit("crop", image);
        this.commit("setCropperData", cropper);
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
    this.commit("upload", image);
    this.cropper.replace(image);
    this.$emit("focus");
    this.$store.commit("notification/add", {
      message: "card.edit.notification.figurineUpload",
    });
  }

  onCrop() {
    if (this.invalidate) {
      this.restoreCropperSettings();
      if (this.figurine.cropper != null) {
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
  background-image: initial !important;
}

.cropper-modal {
  background-color: transparent !important;
  opacity: 1 !important;
}

.fixed-label-slider {
  label {
    width: 32px;
    text-align: right;
  }
}
</style>
