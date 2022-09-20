import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { FighterType } from "~/assets/src/data/fighters";
import { FighterState } from "~/store/fighter";
import { isWindows } from "~/assets/src/helpers";

@Component
export default class AbstractFighterComponent extends Vue {
  @Prop({ type: String, default: "fighter" })
  store!: "fighter";

  get fighterState(): FighterState {
    return this.$store.state[this.store];
  }

  get isKrosmaster(): boolean {
    return this.fighterState.type !== FighterType.MINION;
  }

  get isMinion(): boolean {
    return this.fighterState.type === FighterType.MINION;
  }

  get isElite(): boolean {
    return this.fighterState.type === FighterType.ELITE;
  }

  get isCommon(): boolean {
    return this.fighterState.type === FighterType.COMMON;
  }

  get isWindows(): boolean {
    return isWindows();
  }

  commitToFighterStore(mutation: string, payload?: any) {
    this.$store.commit(`${this.store}/${mutation}`, payload);
  }

  setDirty() {
    this.$store.commit("export/setDirty", true);
  }
}
