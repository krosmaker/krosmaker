import {
  Spell,
  Power,
  Element,
  Range,
  Limit,
  FighterType,
} from "~/assets/src/data/fighters";

export interface FighterState {
  name: string;
  type: FighterType;

  mp: string;
  hp: string;
  ap: string;

  spells: Spell[];
  powers: Power[];
}

export const state: () => FighterState = () => ({
  name: "",
  type: FighterType.COMMON,

  mp: "",
  hp: "",
  ap: "",

  spells: [],
  powers: [],
});

export const mutations = {
  replace(state: FighterState, newState: FighterState) {
    Object.assign(state, newState);
  },

  setName(state: FighterState, name: string) {
    state.name = name || "";
  },
  setType(state: FighterState, type: FighterType) {
    state.type = type;
  },

  setMP(state: FighterState, mp: string) {
    state.mp = mp;
  },
  setHP(state: FighterState, hp: string) {
    state.hp = hp;
  },
  setAP(state: FighterState, ap: string) {
    state.ap = ap;
  },

  addPower(state: FighterState, power: Power) {
    state.powers.push(power);
  },
  removePower(state: FighterState, index: number) {
    state.powers.splice(index, 1);
  },
  switchPowers(state: FighterState, update: { from: number; to: number }) {
    const { from, to } = update;
    const powers = state.powers;
    [powers[from], powers[to]] = [powers[to], powers[from]];
    state.powers = powers.slice();
  },
  setPowerName(state: FighterState, update: { index: number; name: string }) {
    state.powers[update.index].name = update.name || "";
  },
  setPowerDescription(
    state: FighterState,
    update: { index: number; description: string }
  ) {
    state.powers[update.index].description = update.description || "";
  },

  addSpell(state: FighterState, spell: Spell) {
    state.spells.push(spell);
  },
  removeSpell(state: FighterState, index: number) {
    state.spells.splice(index, 1);
  },
  switchSpells(state: FighterState, update: { from: number; to: number }) {
    const { from, to } = update;
    const spells = state.spells;
    [spells[from], spells[to]] = [spells[to], spells[from]];
    state.spells = spells.slice();
  },
  setSpellName(state: FighterState, update: { index: number; name: string }) {
    state.spells[update.index].name = update.name || "";
  },
  setSpellDescription(
    state: FighterState,
    update: { index: number; description: string }
  ) {
    state.spells[update.index].description = update.description || "";
  },
  setSpellElement(
    state: FighterState,
    update: { index: number; element: Element }
  ) {
    state.spells[update.index].damage.element = update.element;
  },
  setSpellDamage(
    state: FighterState,
    update: { index: number; damage: number }
  ) {
    state.spells[update.index].damage.value = update.damage;
  },
  setSpellRangeType(
    state: FighterState,
    update: { index: number; range: Range }
  ) {
    state.spells[update.index].range.type = update.range;
  },
  setSpellRange(
    state: FighterState,
    update: { index: number; range: [number, number] }
  ) {
    state.spells[update.index].range.value = update.range;
  },
  setSpellLimitType(
    state: FighterState,
    update: { index: number; limit: Limit }
  ) {
    state.spells[update.index].limit.type = update.limit;
  },
  setSpellLimit(state: FighterState, update: { index: number; limit: number }) {
    state.spells[update.index].limit.value = update.limit;
  },

  reset(state: FighterState) {
    state.name = "";
    state.type = FighterType.COMMON;

    state.mp = "";
    state.hp = "";
    state.ap = "";

    state.spells = [];
    state.powers = [];
  },
};
