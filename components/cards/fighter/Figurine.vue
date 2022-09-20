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

@Component
export default class Figurine extends AbstractFighterComponent {
  get offsetX(): string {
    const isMinion = this.isMinion;
    const offset = this.$store.state.figurine.offsetX - (isMinion ? 75 : 0);
    // For compatibility with initial approach based on % units:
    const multiplier = isMinion ? 0.8 : 1.04;
    return Math.round(offset * multiplier) + "px";
  }

  get offsetY(): string {
    const offset = this.$store.state.figurine.offsetY;
    // For compatibility with initial approach based on % units:
    const multiplier = this.isMinion ? 0.5 : 0.74;
    return Math.round(offset * multiplier) + "px";
  }

  get height(): string {
    return this.$store.state.figurine.height + "px";
  }

  get figurineImage(): string {
    const figurine = this.$store.state.figurine;
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
