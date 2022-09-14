<template>
  <div class="card-front" :class="{ 'card-front-minion': !isKrosmaster }">
    <img
      v-if="isKrosmaster"
      class="background"
      src="~assets/img/front/background.png"
    />
    <img
      v-else
      class="background minion-background"
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
    border-radius: inherit;
    object-fit: none;
    object-position: center;
    position: absolute;
    left: 0;
    top: 0;
    width: $card-width;
    height: $card-height;
  }

  .minion-background {
    width: $minion-card-width;
    height: $minion-card-height;
  }

  .name {
    position: absolute;
    left: 52px;
    top: 34px;
  }

  .statistics {
    position: absolute;
    left: 437px;
    top: 160px;
  }

  .figurine {
    position: absolute;
  }

  .abilities {
    position: absolute;
    top: 280px;
  }
}

.card-front-minion {
  .name {
    left: 44px;
    top: 53px;
  }

  .statistics {
    left: 114px;
    top: 168px;
  }

  .abilities {
    top: 320px;
  }
}
</style>
