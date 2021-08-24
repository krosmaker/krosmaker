<template>
  <div class="card-front" :class="{ 'card-front-minion': !isKrosmaster }">
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
    left: 26px;
    top: 17px;
  }

  .statistics {
    position: absolute;
    left: 225px;
    top: 75px;
  }

  .figurine {
    position: absolute;
  }

  .abilities {
    position: absolute;
    top: 112px;
  }
}

.card-front-minion {
  .name {
    left: 22px;
    top: 24px;
  }

  .statistics {
    left: 67px;
    top: 77px;
  }

  .abilities {
    top: 136px;
  }
}
</style>
