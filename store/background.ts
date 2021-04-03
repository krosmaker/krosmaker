import Cropper from "cropperjs";

export interface BackgroundState {
  original: string;
  cropped: string;
  useCropped: boolean;
  cropper?: {
    croppingData: Cropper.Data;
    canvasData: Cropper.CanvasData;
  };
}

export const state: () => BackgroundState = () => ({
  original: require("~/assets/img/back/default-background.png"),
  cropped: require("~/assets/img/back/default-background.png"),
  useCropped: true,
});

export const mutations = {
  replace(state: BackgroundState, newState: BackgroundState) {
    Object.assign(state, newState);
  },

  setCropping(state: BackgroundState, useCropped: boolean) {
    state.useCropped = useCropped;
  },
  upload(state: BackgroundState, image: string) {
    state.original = image;
    state.cropped = image;
    state.cropper = undefined;
  },
  crop(state: BackgroundState, image: string) {
    state.cropped = image;
  },
  setCropperData(state: BackgroundState, cropper: Cropper & Vue) {
    state.cropper = {
      canvasData: cropper.getCanvasData(),
      croppingData: cropper.getData(),
    };
  },

  reset(state: BackgroundState) {
    const defaultBackground = require("~/assets/img/back/default-background.png");
    state.original = defaultBackground;
    state.cropped = defaultBackground;
    state.useCropped = true;
    delete state.cropper;
  },
};
