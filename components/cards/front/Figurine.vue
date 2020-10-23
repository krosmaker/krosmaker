<template>
  <img
    :src="figurineImage"
    @click.stop="onClick"
    :style="{
      left: offsetX / 10 + '%',
      top: offsetY / 10 + '%',
      height: height + 'px',
    }"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { TabId } from "~/store/sidebar";

@Component
export default class Figurine extends Vue {
  get offsetX(): number {
    const isMinion = this.$store.state.krosmaster.type === "minion";
    return this.$store.state.figurine.offsetX - (isMinion ? 75 : 0);
  }

  get offsetY(): number {
    return this.$store.state.figurine.offsetY;
  }

  get height(): number {
    return this.$store.state.figurine.height;
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
