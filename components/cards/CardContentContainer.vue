<template>
  <div
    class="data-container"
    :class="{ 'small-data-container': isSmall }"
    :style="{ top: `${offsetY}px`, left: `${offsetX}px` }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { DisplayState, DisplayMode } from "~/store/display";
import { CardType } from "~/store/card";
import {
  cardWidth,
  cardHeight,
  minionCardWidth,
  minionCardHeight,
} from "~/assets/src/constants";

@Component
export default class CardContentContainer extends Vue {
  get isSmall(): boolean {
    const cardType: CardType = this.$store.state.card.type;
    return (
      (cardType === CardType.FIGHTER &&
        this.$store.state.krosmaster.type === "minion") ||
      cardType === CardType.FAVOR
    );
  }

  get offsetX(): number {
    const display: DisplayState = this.$store.state.display;
    if (display.mode === DisplayMode.PRINT) {
      const width = this.isSmall
        ? display.targetMinionWidth
        : display.targetKrosmasterWidth;
      const standardWidth = this.isSmall ? minionCardWidth : cardWidth;
      return display.bleedingOffset + (width - standardWidth) / 2;
    }
    return 0;
  }
  get offsetY(): number {
    const display: DisplayState = this.$store.state.display;
    if (display.mode === DisplayMode.PRINT) {
      const height = this.isSmall
        ? display.targetMinionHeight
        : display.targetKrosmasterHeight;
      const standardHeight = this.isSmall ? minionCardHeight : cardHeight;
      return display.bleedingOffset + (height - standardHeight) / 2;
    }
    return 0;
  }
}
</script>

<style lang="scss" scoped>
.data-container {
  position: absolute;
  width: $card-width;
  height: $card-height;
}

.small-data-container {
  width: $minion-card-width;
  height: $minion-card-height;
}
</style>
