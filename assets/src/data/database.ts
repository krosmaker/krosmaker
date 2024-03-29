import Dexie from "dexie";

import { FighterState } from "~/store/fighter";
import { BackgroundState } from "~/store/background";
import { FigurineState } from "~/store/figurine";
import { CardState } from "~/store/card";
import { FavorState } from "~/store/favor";
import { ChallengeState } from "~/store/challenge";
import { ReverseFigurineState } from "~/store/reverseFigurine";

export interface Card {
  id: string;
  dpi: number;
  card: CardState;
  data?: FighterState;
  favor?: FavorState;
  challenge?: ChallengeState;
  background?: BackgroundState;
  figurine?: FigurineState;
  reverse?: FighterState;
  reverseFigurine?: ReverseFigurineState;
}

export default class KrosmakerDatabase extends Dexie {
  cards: Dexie.Table<Card, string>;

  constructor() {
    super("Krosmaker");
    this.version(5).stores({
      krosmasters:
        "id, dpi, card, data, favor, challenge, background, figurine, reverse, reverseFigurine",
    });

    this.cards = this.table("krosmasters");
  }
}
