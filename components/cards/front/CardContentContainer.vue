<template>
  <div
    class="data-container"
    :class="{ 'minion-data-container': isMinion }"
    :style="{ top: `${offsetY}px`, left: `${offsetX}px` }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { DisplayState, DisplayMode } from "~/store/display";
import {
  cardWidth,
  cardHeight,
  minionCardWidth,
  minionCardHeight,
} from "~/assets/src/constants";

@Component
export default class CardContentContainer extends Vue {
  get isMinion(): boolean {
    return this.$store.state.krosmaster.type === "minion";
  }

  get offsetX(): number {
    const display: DisplayState = this.$store.state.display;
    if (display.mode === DisplayMode.PRINT) {
      const width = this.isMinion
        ? display.targetMinionWidth
        : display.targetKrosmasterWidth;
      const standardWidth = this.isMinion ? minionCardWidth : cardWidth;
      return display.bleedingOffset + (width - standardWidth) / 2;
    }
    return 0;
  }
  get offsetY(): number {
    const display: DisplayState = this.$store.state.display;
    if (display.mode === DisplayMode.PRINT) {
      const height = this.isMinion
        ? display.targetMinionHeight
        : display.targetKrosmasterHeight;
      const standardHeight = this.isMinion ? minionCardHeight : cardHeight;
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

.minion-data-container {
  width: $minion-card-width;
  height: $minion-card-height;
}
</style>
