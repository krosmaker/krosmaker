<template>
  <div class="abilities-container" ref="container">
    <Spells />
    <Powers />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import EventBus from "~/assets/src/events/bus";

@Component
export default class Abilities extends Vue {
  maxAbilitiesHeight = 268;
  maxAbilitiesOffset = 10;

  get isKrosmaster(): boolean {
    return this.$store.state.krosmaster.type !== "minion";
  }

  get container(): HTMLElement {
    return this.$refs.container as HTMLElement;
  }

  mounted() {
    EventBus.$on("abilityResize", () => {
      const container = this.container;
      const height = container.scrollHeight;
      if (this.isKrosmaster && height > this.maxAbilitiesHeight) {
        const offset = Math.min(
          this.maxAbilitiesOffset,
          height - this.maxAbilitiesHeight
        );
        container.style.marginTop = `-${offset}px`;
      } else {
        container.style.marginTop = "0px";
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.abilities-container {
  width: $card-width;
  height: $card-height * 0.7;
}
</style>
