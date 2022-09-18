export enum FavorType {
  REGULAR = "regular",
  SUPERIOR = "superior",
}

export interface FavorState {
  name: string;
  type: FavorType;
  effect: string;
}

export const state: () => FavorState = () => ({
  name: "",
  type: FavorType.REGULAR,
  effect: "",
});

export const mutations = {
  replace(state: FavorState, newState: FavorState) {
    Object.assign(state, newState);
  },

  setName(state: FavorState, name: string) {
    state.name = name;
  },
  setType(state: FavorState, type: FavorType) {
    state.type = type;
  },
  setEffect(state: FavorState, effect: string) {
    state.effect = effect;
  },

  reset(state: FavorState) {
    state.name = "";
    state.type = FavorType.REGULAR;
    state.effect = "";
  },
};
