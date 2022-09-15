<template>
  <div class="flippable" :class="{ 'is-flipped': isFlipped }">
    <div class="front" :class="{ 'is-bottom': isFlipped }">
      <slot name="front"></slot>
    </div>
    <div class="back" :class="{ 'is-bottom': !isFlipped }">
      <slot name="back"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

/**
 * Allows to display pseudo-3D flippable element with a front and a back side.
 */
@Component
export default class Flippable extends Vue {
  @Prop({ type: Boolean, default: true })
  isFlipped!: boolean;
}
</script>

<style lang="scss" scoped>
.flippable {
  transition: transform 0.5s, border-radius 0.2s;
  transform-style: preserve-3d;

  .front,
  .back {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    border-radius: inherit;
    backface-visibility: hidden;
  }

  .back {
    transform: rotateY(180deg);
  }

  // Prevents from triggering click events on the hidden side:
  .is-bottom {
    pointer-events: none;
  }
}

.is-flipped {
  transform: rotateY(180deg);
}
</style>
