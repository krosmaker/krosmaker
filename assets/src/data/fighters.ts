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

export enum FighterType {
  COMMON = "common",
  ELITE = "elite",
  MINION = "minion",
}

export interface Power {
  name: string;
  description: string;
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
