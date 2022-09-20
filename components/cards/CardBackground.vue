<template>
  <img
    v-if="isRegularSize"
    class="background-image"
    :style="{ width: `${cardWidth}px`, height: `${cardHeight}px` }"
    :src="image"
  />
  <img
    v-else
    class="background-image"
    :style="{ width: `${smallCardWidth}px`, height: `${smallCardHeight}px` }"
    :src="smallImage"
  />
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";

import CardAwareComponent from "~/components/cards/CardAwareComponent";
import { DisplayState, DisplayMode } from "~/store/display";
import {
  cardWidth,
  cardHeight,
  minionCardWidth,
  minionCardHeight,
} from "~/assets/src/constants";

@Component
export default class CardBackground extends CardAwareComponent {
  @Prop({ type: String, default: "" })
  image!: string;

  @Prop({ type: String, default: "" })
  smallImage!: string;

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

  get smallCardWidth(): number {
    const display: DisplayState = this.$store.state.display;
    return display.mode === DisplayMode.PRINT
      ? display.targetMinionWidth + display.bleedingOffset * 2
      : minionCardWidth;
  }

  get smallCardHeight(): number {
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
