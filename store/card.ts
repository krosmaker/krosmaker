export enum CardType {
  FIGHTER = "fighter",
  FAVOR = "favor",
  CHALLENGE = "challenge",
}

export interface CardState {
  type: CardType;
  comment: string;
  version: string;
}

export const state: () => CardState = () => ({
  type: CardType.FIGHTER,
  comment: "",
  version: "",
});

export const mutations = {
  reset(state: CardState) {
    // Type does not need to be cleared.
    state.comment = "";
    state.version = "";
  },
  replace(state: CardState, newState: CardState) {
    Object.assign(state, newState);
  },

  setType(state: CardState, type: CardType) {
    state.type = type;
  },
  setComment(state: CardState, comment: string) {
    state.comment = comment;
  },
  setVersion(state: CardState, version: string) {
    state.version = version;
  },
};
