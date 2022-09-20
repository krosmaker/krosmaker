<template>
  <div class="card-front" :class="{ 'card-front-minion': isMinion }">
    <CardBackground
      class="background"
      :image="require('~/assets/img/front/background.png')"
      :smallImage="require('~/assets/img/front/background-minion.png')"
    />
    <CardContentContainer>
      <FighterName class="name" :store="store" />
      <Statistics class="statistics" :store="store" />
      <Figurine class="figurine" :store="store" />
      <Abilities class="abilities" :store="store" />
    </CardContentContainer>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import AbstractFighterComponent from "~/components/cards/fighter/AbstractFighterComponent";

@Component
export default class FighterFront extends AbstractFighterComponent {}
</script>

<style lang="scss" scoped>
$abilities-offset: 272px;

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
    top: $abilities-offset;
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
