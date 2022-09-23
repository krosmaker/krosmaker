import Cropper from "cropperjs";
import { ReverseFigurineState } from "~/store/reverseFigurine";
import ImageState from "~/store/image";

export interface FigurineState extends ImageState {
  height: number;
  offsetX: number;
  offsetY: number;
}

export const state: () => FigurineState = () => ({
  original: require("~/assets/img/front/default-figurine.png"),
  cropped: require("~/assets/img/front/default-figurine.png"),
  useCropped: true,
  height: 350, // px
  offsetX: 730, // 73.0% left
  offsetY: 10, // 1.0% top
});

export const mutations = {
  replace(state: FigurineState, newState: FigurineState) {
    Object.assign(state, newState);
    if (!newState.cropped) {
      state.cropped = newState.original;
    }
  },

  setHeight(state: FigurineState, height: number) {
    state.height = height;
  },
  setOffsetX(state: FigurineState, offsetX: number) {
    state.offsetX = offsetX;
  },
  setOffsetY(state: FigurineState, offsetY: number) {
    state.offsetY = offsetY;
  },
  setCropping(state: FigurineState, useCropped: boolean) {
    state.useCropped = useCropped;
  },
  upload(state: FigurineState, image: string) {
    state.original = image;
    state.cropped = image;
    state.cropper = undefined;
  },
  crop(state: FigurineState, image: string) {
    state.cropped = image;
  },
  setCropperData(state: FigurineState, cropper: Cropper & Vue) {
    state.cropper = {
      canvasData: cropper.getCanvasData(),
      croppingData: cropper.getData(),
    };
  },

  setUseSameImage(state: FigurineState, useSameImage: boolean) {
    // Workaround for sharing mutations with reverseFigurine.
    (state as ReverseFigurineState).useSameImage = useSameImage;
  },

  reset(state: FigurineState) {
    const defaultFigurine = require("~/assets/img/front/default-figurine.png");
    state.original = defaultFigurine;
    state.cropped = defaultFigurine;
    state.useCropped = true;
    state.height = 350;
    state.offsetX = 730;
    state.offsetY = 10;
    delete state.cropper;
    // Workaround for sharing mutations with reverseFigurine.
    if ("useSameImage" in state) {
      (state as ReverseFigurineState).useSameImage = true;
    }
  },
};
