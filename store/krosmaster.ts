export interface Power {
  name: string;
  description: string;
}

interface KrosmasterState {
  name: string;
  isElite: boolean;

  mp: string;
  hp: string;
  ap: string;

  spells: Array<any>;
  powers: Power[];
}

export const state: () => KrosmasterState = () => ({
  name: "Enter Krosmaster name",
  isElite: true,

  mp: "3",
  hp: "12",
  ap: "2",

  spells: [],
  powers: [],
});

export const mutations = {
  setName(state: KrosmasterState, name: string) {
    state.name = name || "";
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

  addPower(state: KrosmasterState, power: Power) {
    state.powers.push(power);
  },
  removePower(state: KrosmasterState, index: number) {
    state.powers.splice(index, 1);
  },
  switchPowers(state: KrosmasterState, update: { from: number; to: number }) {
    const { from, to } = update;
    const powers = state.powers;
    [powers[from], powers[to]] = [powers[to], powers[from]];
    state.powers = powers.slice();
  },
  changePowerName(
    state: KrosmasterState,
    update: { index: number; name: string }
  ) {
    state.powers[update.index].name = update.name || "";
  },
  changePowerDescription(
    state: KrosmasterState,
    update: { index: number; description: string }
  ) {
    state.powers[update.index].description = update.description || "";
  },
};
