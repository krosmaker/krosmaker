import Vue from "vue";
import { Component } from "vue-property-decorator";
import { FighterType } from "~/assets/src/data/fighters";

import { CardType } from "~/store/card";
import { DisplayMode, DisplayState } from "~/store/display";
import { FighterState } from "~/store/fighter";

/**
 * Common component class for components that need information
 * about the currently configured card.
 */
@Component
export default class CardAwareComponent extends Vue {
  get cardType(): CardType {
    return this.$store.state.card.type;
  }

  get isFighter(): boolean {
    return this.cardType === CardType.FIGHTER;
  }

  get isFavor(): boolean {
    return this.cardType === CardType.FAVOR;
  }

  get isChallenge(): boolean {
    return this.cardType === CardType.CHALLENGE;
  }

  get fighterState(): FighterState {
    const fighterState = this.$store.state.fighter;
    if (fighterState.twoSided) {
      return this.isFlipped ? this.$store.state.reverse : fighterState;
    }
    return fighterState;
  }

  get isTwoSided(): boolean {
    return this.$store.state.fighter.twoSided;
  }

  get isKrosmaster(): boolean {
    return this.fighterState.type !== FighterType.MINION;
  }

  get isMinion(): boolean {
    return this.fighterState.type === FighterType.MINION;
  }

  get isFlipped(): boolean {
    return this.$store.state.display.isFlipped;
  }

  set isFlipped(isFlipped: boolean) {
    if (this.isFighter && this.isTwoSided) {
      // Ensuring that non-existing spells or powers are not selected:
      this.$store.commit("sidebar/reset");
    }
    this.$store.commit("display/setFlipped", isFlipped);
  }

  get isRegularSize(): boolean {
    return (this.isFighter && this.isKrosmaster) || this.isChallenge;
  }

  get isSmallSize(): boolean {
    return (this.isFighter && this.isMinion) || this.isFavor;
  }

  get isRounded(): boolean {
    const display: DisplayState = this.$store.state.display;
    return display.mode === DisplayMode.PLAY && display.roundedCorners;
  }
}
