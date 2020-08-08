interface KrosmasterState {
  name: string;
  isElite: boolean;

  mp: string;
  hp: string;
  ap: string;
}

export const state: () => KrosmasterState = () => ({
  name: "Enter Krosmaster name",
  isElite: true,

  mp: "3",
  hp: "12",
  ap: "2",
});

export const mutations = {
  setName(state: KrosmasterState, name: string) {
    state.name = name;
  },
  setElite(state: KrosmasterState, isElite: boolean) {
    state.isElite = isElite;
  },
  setMP(state: KrosmasterState, mp: string) {
    state.mp = mp;
  },
  setHP(state: KrosmasterState, hp: string) {
    state.hp = hp;
  },
  setAP(state: KrosmasterState, ap: string) {
    state.ap = ap;
  },
};
