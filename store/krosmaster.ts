interface KrosmasterState {
  name: string;
  isElite: boolean;
}

export const state: () => KrosmasterState = () => ({
  name: "Enter Krosmaster name",
  isElite: true,
});

export const mutations = {
  setName(state: KrosmasterState, name: string) {
    state.name = name;
  },
  setElite(state: KrosmasterState, isElite: boolean) {
    state.isElite = isElite;
  },
};
