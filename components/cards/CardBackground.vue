<template>
  <img
    v-if="isKrosmaster"
    class="background-image"
    :style="{ width: `${cardWidth}px`, height: `${cardHeight}px` }"
    :src="image"
  />
  <img
    v-else
    class="background-image"
    :style="{ width: `${minionCardWidth}px`, height: `${minionCardHeight}px` }"
    :src="minionImage"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { DisplayState, DisplayMode } from "~/store/display";
import {
  cardWidth,
  cardHeight,
  minionCardWidth,
  minionCardHeight,
} from "~/assets/src/constants";

@Component
export default class CardBackground extends Vue {
  @Prop({ type: String })
  image!: string;

  @Prop({ type: String })
  minionImage!: string;

  get isKrosmaster(): boolean {
    return this.$store.state.krosmaster.type !== "minion";
  }

  get cardWidth(): number {
    const display: DisplayState = this.$store.state.display;
    return display.mode === DisplayMode.PRINT
      ? display.targetKrosmasterWidth + display.bleedingOffset * 2
      : cardWidth;
  }

  get cardHeight(): number {
    const display: DisplayState = this.$store.state.display;
    return display.mode === DisplayMode.PRINT
      ? display.targetKrosmasterHeight + display.bleedingOffset * 2
      : cardHeight;
  }

  get minionCardWidth(): number {
    const display: DisplayState = this.$store.state.display;
    return display.mode === DisplayMode.PRINT
      ? display.targetMinionWidth + display.bleedingOffset * 2
      : minionCardWidth;
  }

  get minionCardHeight(): number {
    const display: DisplayState = this.$store.state.display;
    return display.mode === DisplayMode.PRINT
      ? display.targetMinionHeight + display.bleedingOffset * 2
      : minionCardHeight;
  }
}
</script>

<style lang="scss" scoped>
.background-image {
  border-radius: inherit;
  object-fit: none;
  object-position: center;
}
</style>
