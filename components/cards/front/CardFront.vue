<template>
  <div class="card-front" :class="{ 'card-front-minion': isMinion }">
    <CardBackground
      class="background"
      :image="require('~/assets/img/front/background.png')"
      :minionImage="require('~/assets/img/front/background-minion.png')"
    />
    <CardContentContainer>
      <FighterName class="name" />
      <Statistics class="statistics" />
      <Figurine class="figurine" />
      <Abilities class="abilities" />
    </CardContentContainer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class CardFront extends Vue {
  get isMinion(): boolean {
    return this.$store.state.krosmaster.type === "minion";
  }
}
</script>

<style lang="scss" scoped>
.card-front {
  border-radius: inherit;

  .background {
    position: absolute;
    left: 0;
    top: 0;
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
