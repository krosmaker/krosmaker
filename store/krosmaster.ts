import {
  Spell,
  Power,
  Element,
  Range,
  Limit,
} from "~/assets/src/data/fighters";
export type KrosmasterType = "common" | "elite" | "minion";

export interface KrosmasterState {
  name: string;
  type: KrosmasterType;

  mp: string;
  hp: string;
  ap: string;

  spells: Spell[];
  powers: Power[];
}

export const state: () => KrosmasterState = () => ({
  name: "",
  type: "common",
  mp: "",
  hp: "",
  ap: "",

  spells: [],
  powers: [],
});

export const mutations = {
  replace(state: KrosmasterState, newState: KrosmasterState) {
    Object.assign(state, newState);
  },

  setName(state: KrosmasterState, name: string) {
    state.name = name || "";
  },
  setType(state: KrosmasterState, type: KrosmasterType) {
    state.type = type;
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
  setPowerName(
    state: KrosmasterState,
    update: { index: number; name: string }
  ) {
    state.powers[update.index].name = update.name || "";
  },
  setPowerDescription(
    state: KrosmasterState,
    update: { index: number; description: string }
  ) {
    state.powers[update.index].description = update.description || "";
  },

  addSpell(state: KrosmasterState, spell: Spell) {
    state.spells.push(spell);
  },
  removeSpell(state: KrosmasterState, index: number) {
    state.spells.splice(index, 1);
  },
  switchSpells(state: KrosmasterState, update: { from: number; to: number }) {
    const { from, to } = update;
    const spells = state.spells;
    [spells[from], spells[to]] = [spells[to], spells[from]];
    state.spells = spells.slice();
  },
  setSpellName(
    state: KrosmasterState,
    update: { index: number; name: string }
  ) {
    state.spells[update.index].name = update.name || "";
  },
  setSpellDescription(
    state: KrosmasterState,
    update: { index: number; description: string }
  ) {
    state.spells[update.index].description = update.description || "";
  },
  setSpellElement(
    state: KrosmasterState,
    update: { index: number; element: Element }
  ) {
    state.spells[update.index].damage.element = update.element;
  },
  setSpellDamage(
    state: KrosmasterState,
    update: { index: number; damage: number }
  ) {
    state.spells[update.index].damage.value = update.damage;
  },
  setSpellRangeType(
    state: KrosmasterState,
    update: { index: number; range: Range }
  ) {
    state.spells[update.index].range.type = update.range;
  },
  setSpellRange(
    state: KrosmasterState,
    update: { index: number; range: [number, number] }
  ) {
    state.spells[update.index].range.value = update.range;
  },
  setSpellLimitType(
    state: KrosmasterState,
    update: { index: number; limit: Limit }
  ) {
    state.spells[update.index].limit.type = update.limit;
  },
  setSpellLimit(
    state: KrosmasterState,
    update: { index: number; limit: number }
  ) {
    state.spells[update.index].limit.value = update.limit;
  },

  reset(state: KrosmasterState) {
    state.name = "";
    state.type = "common";

    state.mp = "";
    state.hp = "";
    state.ap = "";

    state.spells = [];
    state.powers = [];
  },
};
