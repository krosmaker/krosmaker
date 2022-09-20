<template>
  <div
    class="data-container"
    :class="{ 'small-data-container': isSmallSize }"
    :style="{ top: `${offsetY}px`, left: `${offsetX}px` }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import CardAwareComponent from "~/components/cards/CardAwareComponent";
import { DisplayState, DisplayMode } from "~/store/display";
import {
  cardWidth,
  cardHeight,
  minionCardWidth,
  minionCardHeight,
} from "~/assets/src/constants";

@Component
export default class CardContentContainer extends CardAwareComponent {
  get offsetX(): number {
    const display: DisplayState = this.$store.state.display;
    const isSmall = this.isSmallSize;
    if (display.mode === DisplayMode.PRINT) {
      const width = isSmall
        ? display.targetMinionWidth
        : display.targetKrosmasterWidth;
      const standardWidth = isSmall ? minionCardWidth : cardWidth;
      return display.bleedingOffset + (width - standardWidth) / 2;
    }
    return 0;
  }

  get offsetY(): number {
    const display: DisplayState = this.$store.state.display;
    const isSmall = this.isSmallSize;
    if (display.mode === DisplayMode.PRINT) {
      const height = isSmall
        ? display.targetMinionHeight
        : display.targetKrosmasterHeight;
      const standardHeight = isSmall ? minionCardHeight : cardHeight;
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
