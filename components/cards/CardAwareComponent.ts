import Vue from "vue";
import { Component } from "vue-property-decorator";
import { FighterType } from "~/assets/src/data/fighters";
import EventBus from "~/assets/src/events/bus";

import { CardType } from "~/store/card";
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
    return this.$store.state.fighter;
  }

  get isKrosmaster(): boolean {
    return this.fighterState.type !== FighterType.MINION;
  }

  get isMinion(): boolean {
    return this.fighterState.type === FighterType.MINION;
  }

  get isRegularSize(): boolean {
    return (this.isFighter && this.isKrosmaster) || this.isChallenge;
  }

  get isSmallSize(): boolean {
    return (this.isFighter && this.isMinion) || this.isFavor;
  }
}
