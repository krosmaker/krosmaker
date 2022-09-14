import Dexie from "dexie";

import { KrosmasterState } from "~/store/krosmaster";
import { BackgroundState } from "~/store/background";
import { FigurineState } from "~/store/figurine";

export interface Krosmaster {
  id: string;
  dpi: number;
  data: KrosmasterState;
  background: BackgroundState;
  figurine: FigurineState;
}

export default class KrosmakerDatabase extends Dexie {
  krosmasters: Dexie.Table<Krosmaster, string>;

  constructor() {
    super("Krosmaker");
    this.version(2).stores({
      krosmasters: "id, dpi, data, background, figurine",
    });

    this.krosmasters = this.table("krosmasters");
  }
}
