import EventBus from "~/assets/src/events/bus";
import {
  cardWidth,
  cardHeight,
  minionCardWidth,
  minionCardHeight,
} from "~/assets/src/constants";

export enum DisplayMode {
  PLAY = 0,
  PRINT = 1,
}

export enum Scale {
  LARGE = 0,
  MEDIUM = 1,
  SMALL = 2,
}

export interface DisplayState {
  mode: DisplayMode;
  targetKrosmasterWidth: number;
  targetKrosmasterHeight: number;
  targetMinionWidth: number;
  targetMinionHeight: number;
  bleedingOffset: number;
  roundedCorners: boolean;
  scale: Scale;
  isValid: boolean;
}

function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (!process.browser || !window?.localStorage) return defaultValue;
  const item = localStorage.getItem(key);
  return item !== null ? (JSON.parse(item) as T) : defaultValue;
}

function saveInLocalStorage<T>(key: string, value: T) {
  if (!process.browser || !window?.localStorage) return;
  localStorage.setItem(key, JSON.stringify(value));
}

export const state: () => DisplayState = () => ({
  mode: loadFromLocalStorage("display.mode", DisplayMode.PLAY),
  targetKrosmasterWidth: loadFromLocalStorage(
    "display.targetKrosmasterWidth",
    cardWidth
  ),
  targetKrosmasterHeight: loadFromLocalStorage(
    "display.targetKrosmasterHeight",
    cardHeight
  ),
  targetMinionWidth: loadFromLocalStorage(
    "display.targetMinionWidth",
    minionCardWidth
  ),
  targetMinionHeight: loadFromLocalStorage(
    "display.targetMinionHeight",
    minionCardHeight
  ),
  bleedingOffset: loadFromLocalStorage("display.bleedingOffset", 36),
  roundedCorners: loadFromLocalStorage("display.roundedCorners", true),
  scale: loadFromLocalStorage("display.scale", Scale.LARGE),
  isValid: true,
});

export const mutations = {
  reload(state: DisplayState) {
    state.mode = loadFromLocalStorage("display.mode", DisplayMode.PLAY);
    state.targetKrosmasterWidth = loadFromLocalStorage(
      "display.targetKrosmasterWidth",
      state.targetKrosmasterWidth
    );
    state.targetKrosmasterHeight = loadFromLocalStorage(
      "display.targetKrosmasterHeight",
      state.targetKrosmasterHeight
    );
    state.targetMinionWidth = loadFromLocalStorage(
      "display.targetMinionWidth",
      state.targetMinionWidth
    );
    state.targetMinionHeight = loadFromLocalStorage(
      "display.targetMinionHeight",
      state.targetMinionHeight
    );
    state.bleedingOffset = loadFromLocalStorage(
      "display.bleedingOffset",
      state.bleedingOffset
    );
    state.roundedCorners = loadFromLocalStorage(
      "display.roundedCorners",
      state.roundedCorners
    );
    state.scale = loadFromLocalStorage("display.scale", state.scale);
    EventBus.$emit("abilityResize");
  },

  setMode(state: DisplayState, mode: DisplayMode) {
    state.mode = mode;
    EventBus.$emit("abilityResize");
    saveInLocalStorage("display.mode", mode);
  },

  setTargetKrosmasterWidth(state: DisplayState, targetKrosmasterWidth: number) {
    state.targetKrosmasterWidth = targetKrosmasterWidth;
    saveInLocalStorage("display.targetKrosmasterWidth", targetKrosmasterWidth);
  },
  setTargetKrosmasterHeight(
    state: DisplayState,
    targetKrosmasterHeight: number
  ) {
    state.targetKrosmasterHeight = targetKrosmasterHeight;
    EventBus.$emit("abilityResize");
    saveInLocalStorage(
      "display.targetKrosmasterHeight",
      targetKrosmasterHeight
    );
  },

  setTargetMinionWidth(state: DisplayState, targetMinionWidth: number) {
    state.targetMinionWidth = targetMinionWidth;
    saveInLocalStorage("display.targetMinionWidth", targetMinionWidth);
  },
  setTargetMinionHeight(state: DisplayState, targetMinionHeight: number) {
    state.targetMinionHeight = targetMinionHeight;
    saveInLocalStorage("display.targetMinionHeight", targetMinionHeight);
  },

  setBleedingOffset(state: DisplayState, bleedingOffset: number) {
    state.bleedingOffset = bleedingOffset;
    saveInLocalStorage("display.bleedingOffset", bleedingOffset);
  },

  setRoundedCorners(state: DisplayState, roundedCorners: boolean) {
    state.roundedCorners = roundedCorners;
    saveInLocalStorage("display.roundedCorners", roundedCorners);
  },
  setScale(state: DisplayState, scale: Scale) {
    state.scale = scale;
    saveInLocalStorage("display.scale", scale);
  },

  setValid(state: DisplayState, isValid: boolean) {
    state.isValid = isValid;
  },
};
