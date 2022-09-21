<template>
  <img
    :src="figurineImage"
    @click.stop="onClick"
    :style="{
      left: offsetX,
      top: offsetY,
      height: height,
    }"
  />
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import AbstractFighterComponent from "./AbstractFighterComponent";
import { TabId } from "~/store/sidebar";
import { FigurineState } from "~/store/figurine";

@Component
export default class Figurine extends AbstractFighterComponent {
  get figurineState(): FigurineState {
    if (this.isReverse) {
      const reverse = this.$store.state.reverseFigurine;
      if (!reverse.useSameImage) return reverse;
    }
    return this.$store.state.figurine;
  }

  get offsetX(): string {
    const isMinion = this.isMinion;
    const offset = this.figurineState.offsetX - (isMinion ? 75 : 0);
    // For compatibility with initial approach based on % units:
    const multiplier = isMinion ? 0.8 : 1.04;
    return Math.round(offset * multiplier) + "px";
  }

  get offsetY(): string {
    const offset = this.figurineState.offsetY;
    // For compatibility with initial approach based on % units:
    const multiplier = this.isMinion ? 0.5 : 0.74;
    return Math.round(offset * multiplier) + "px";
  }

  get height(): string {
    return this.figurineState.height + "px";
  }

  get figurineImage(): string {
    const figurine = this.figurineState;
    return figurine.useCropped ? figurine.cropped : figurine.original;
  }

  onClick() {
    const store = this.$store;
    store.commit("sidebar/setExpand", true);
    store.commit("sidebar/setActiveTab", TabId.FIGURINE);
  }
}
</script>

<style lang="scss" scoped>
.figurine {
  cursor: pointer;
}
</style>
