import Dexie from "dexie";

import { KrosmasterState } from "~/store/krosmaster";
import { BackgroundState } from "~/store/background";
import { FigurineState } from "~/store/figurine";
import { CardState } from "~/store/card";
import { FavorState } from "~/store/favor";

export interface Card {
  id: string;
  dpi: number;
  card: CardState;
  data?: KrosmasterState;
  favor?: FavorState;
  background?: BackgroundState;
  figurine?: FigurineState;
}

export default class KrosmakerDatabase extends Dexie {
  cards: Dexie.Table<Card, string>;

  constructor() {
    super("Krosmaker");
    this.version(3).stores({
      krosmasters: "id, dpi, card, data, background, figurine",
    });

    this.cards = this.table("krosmasters");
  }
}
