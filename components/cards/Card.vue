<template>
  <Flippable
    class="card"
    :is-flipped="isFlipped"
    :class="{ 'is-rounded': isRounded }"
  >
    <template v-slot:front>
      <CardFront ref="front" class="card-front" />
    </template>
    <template v-slot:back>
      <CardBack ref="back" class="card-back" />
    </template>
  </Flippable>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { DisplayState, DisplayMode, Scale } from "~/store/display";

/**
 * Displays a flippable Krosmaster card with a front and a back side.
 */
@Component
export default class Card extends Vue {
  @Prop({ type: Boolean, default: false })
  isFlipped!: boolean;

  get isMinion(): boolean {
    return this.$store.state.krosmaster.type === "minion";
  }

  get isRounded(): boolean {
    const display: DisplayState = this.$store.state.display;
    return display.mode === DisplayMode.PLAY && display.roundedCorners;
  }

  get isSmall(): boolean {
    const display: DisplayState = this.$store.state.display;
    return display.mode === DisplayMode.PLAY && display.scale === Scale.SMALL;
  }

  get isMedium(): boolean {
    const display: DisplayState = this.$store.state.display;
    return display.mode === DisplayMode.PLAY && display.scale === Scale.MEDIUM;
  }
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  width: 100%;
  height: 100%;

  .card-front,
  .card-back {
    transition: transform 0.5s, border-radius 0.2s;
    width: inherit;
    height: inherit;
    overflow: hidden;
  }
}

.is-rounded {
  border-radius: $card-border-radius;
}
</style>
