<template>
  <Flippable
    class="card"
    :is-flipped="isFlipped"
    :class="{ 'is-rounded': isRounded }"
  >
    <template v-slot:front>
      <FighterFront class="card-front" ref="front" v-if="isFighter" />
      <FavorFront class="card-front" ref="front" v-else-if="isFavor" />
      <ChallengeFront class="card-front" ref="front" v-else />
    </template>
    <template v-slot:back>
      <FighterBack class="card-back" ref="back" v-if="isFighter" />
      <FavorBack class="card-back" ref="back" v-else-if="isFavor" />
      <ChallengeBack class="card-back" ref="back" v-else />
    </template>
  </Flippable>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import CardAwareComponent from "./CardAwareComponent";

/**
 * Displays a flippable Krosmaster card with a front and a back side.
 */
@Component
export default class Card extends CardAwareComponent {}
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
