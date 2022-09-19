export interface DivinePower {
  name: string;
  isActive: boolean;
  glyphs: number;
  description: string;
}

export interface ChallengeState {
  name: string;
  powers: DivinePower[];
}

function getDefaultPower(glyphs: number): DivinePower {
  return {
    name: "",
    isActive: false,
    glyphs,
    description: "",
  };
}

export const state: () => ChallengeState = () => ({
  name: "",
  powers: [getDefaultPower(1), getDefaultPower(3), getDefaultPower(5)],
});

export const mutations = {
  replace(state: ChallengeState, newState: ChallengeState) {
    Object.assign(state, newState);
  },

  setName(state: ChallengeState, name: string) {
    state.name = name;
  },

  setPowerName(state: ChallengeState, update: { index: number; name: string }) {
    state.powers[update.index].name = update.name || "";
  },
  setPowerGlyphs(
    state: ChallengeState,
    update: { index: number; glyphs: number }
  ) {
    state.powers[update.index].glyphs = update.glyphs;
  },
  setPowerDescription(
    state: ChallengeState,
    update: { index: number; description: string }
  ) {
    state.powers[update.index].description = update.description || "";
  },
  setPowerType(
    state: ChallengeState,
    update: { index: number; isActive: boolean }
  ) {
    state.powers[update.index].isActive = update.isActive;
  },

  reset(state: ChallengeState) {
    state.name = "";
    state.powers = [getDefaultPower(1), getDefaultPower(3), getDefaultPower(5)];
  },
};
