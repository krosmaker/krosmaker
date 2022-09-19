<template>
  <div class="abilities-container" ref="container">
    <Spells />
    <Powers />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import {
  abilitiesMargin,
  abilitiesOffset,
  cardHeight,
} from "~/assets/src/constants";
import { DisplayState, DisplayMode } from "~/store/display";

import EventBus from "~/assets/src/events/bus";

@Component
export default class Abilities extends Vue {
  maxAbilitiesOffset = 25;

  get isKrosmaster(): boolean {
    return this.$store.state.krosmaster.type !== "minion";
  }

  get container(): HTMLElement {
    return this.$refs.container as HTMLElement;
  }

  get maxAbilitiesHeight(): number {
    const display: DisplayState = this.$store.state.display;
    // Bottom area removed from or added to the standard card
    // height by resizing it in display settings:
    const offset =
      display.mode == DisplayMode.PRINT
        ? (display.targetKrosmasterHeight - cardHeight) / 2
        : 0;
    // Max height = standard card height + added/removed area
    // - top abilities position + empty bottom abilities margin
    return cardHeight + offset - abilitiesOffset + abilitiesMargin;
  }

  mounted() {
    EventBus.$on("abilityResize", () => {
      const container = this.container;
      if (!container) return;
      const height = container.scrollHeight;
      const maxHeight = this.maxAbilitiesHeight;
      if (this.isKrosmaster && height > maxHeight) {
        let offset = height - maxHeight;
        if (offset > this.maxAbilitiesOffset) {
          offset = this.maxAbilitiesOffset;
          this.$store.commit("display/setValid", false);
        } else {
          this.$store.commit("display/setValid", true);
        }
        container.style.marginTop = `-${offset}px`;
      } else {
        container.style.marginTop = "0px";
        this.$store.commit("display/setValid", true);
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.abilities-container {
  width: $card-width;
}
</style>
