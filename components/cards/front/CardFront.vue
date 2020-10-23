<template>
  <div class="card-front">
    <img
      v-if="isKrosmaster"
      class="background"
      src="~assets/img/front/background.png"
    />
    <img
      v-else
      class="background"
      src="~assets/img/front/background-minion.png"
    />
    <FighterName class="name" />
    <Statistics class="statistics" />
    <Figurine class="figurine" />
    <Abilities class="abilities" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class CardFront extends Vue {
  get isKrosmaster(): boolean {
    return this.$store.state.krosmaster.type !== "minion";
  }
}
</script>

<style lang="scss" scoped>
.card-front {
  border-radius: inherit;

  .background {
    // Using an <img> instead of background-image to avoid artifacts.
    border-radius: inherit;
    position: absolute;
    left: 0;
    top: 0;
  }

  .name {
    position: absolute;
    left: 5%;
    top: 4.8%;
  }

  .statistics {
    position: absolute;
    left: 43.2%;
    top: 20%;
  }

  .figurine {
    position: absolute;
  }

  .abilities {
    position: absolute;
    top: 30%;
  }
}
</style>
