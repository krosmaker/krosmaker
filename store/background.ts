interface BackgroundState {
  original: string;
  cropped: string;
  useCropped: boolean;
}

export const state: () => BackgroundState = () => ({
  original: require("~/assets/img/back/default-background.png"),
  cropped: require("~/assets/img/back/default-background.png"),
  useCropped: true,
});

export const mutations = {
  setCropping(state: BackgroundState, useCropped: boolean) {
    state.useCropped = useCropped;
  },
  upload(state: BackgroundState, image: string) {
    state.original = image;
    state.cropped = image;
  },
  crop(state: BackgroundState, image: string) {
    state.cropped = image;
  },
};
