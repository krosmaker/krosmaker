<template>
  <Flippable
    class="card"
    :is-flipped="isFlipped"
    :class="{ 'is-rounded': isRounded }"
  >
    <template v-slot:front>
      <CardFront
        ref="front"
        class="card-front"
        :class="{ 'is-rounded': isRounded }"
      />
    </template>
    <template v-slot:back>
      <CardBack
        ref="back"
        class="card-back"
        :class="{ 'is-rounded': isRounded }"
      />
    </template>
  </Flippable>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

/**
 * Displays a flippable Krosmaster card with a front and a back side.
 */
@Component
export default class Card extends Vue {
  @Prop({ type: Boolean, default: false })
  isFlipped!: boolean;

  @Prop({ type: Boolean, default: true })
  isRounded!: boolean;
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  width: 100%;
  height: 100%;

  .card-front,
  .card-back {
    width: inherit;
    height: inherit;
    overflow: hidden;
  }
}

.is-rounded {
  border-radius: $card-border-radius;
}
</style>
