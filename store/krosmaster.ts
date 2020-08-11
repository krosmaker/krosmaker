export interface Power {
  name: string;
  description: string;
}

export enum Element {
  NONE = "none",
  AIR = "air",
  EARTH = "earth",
  FIRE = "fire",
  WATER = "water",
}

export enum Range {
  REGULAR = "regular",
  SPECIAL = "special",
}

export enum Limit {
  NONE = "none",
  TURN = "turn",
  TARGET = "target",
}

export interface Spell extends Power {
  damage: {
    element: Element;
    value: number;
  };
  range: {
    type: Range;
    value: [number, number];
  };
  limit: {
    type: Limit;
    value: number;
  };
}

interface KrosmasterState {
  name: string;
  isElite: boolean;

  mp: string;
  hp: string;
  ap: string;

  spells: Spell[];
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
    console.log("updating range in state", update);
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
};
