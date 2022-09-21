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

      <div
        v-if="isReverse"
        :class="{ watermark: true, 'watermark-minion': isMinion }"
      >
        @Krosmaker
      </div>
      <div
        v-if="isReverse"
        :class="{ version: true, 'version-minion': isMinion }"
      >
        {{ version }}
      </div>
    </CardContentContainer>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import AbstractFighterComponent from "~/components/cards/fighter/AbstractFighterComponent";

@Component
export default class FighterFront extends AbstractFighterComponent {
  get version(): string {
    return this.$store.state.card.version || "";
  }
}
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

.watermark,
.version {
  position: absolute;
  font-family: "Helvetica Neue", "Verdana";
  letter-spacing: 0.5px;
}

.watermark {
  color: #382562;
  font-size: 20px;
  transform: rotate(-90deg);
  transform-origin: 0 0;

  left: 1003px;
  top: 440px;
}

.watermark-minion {
  left: 764px;
  top: 315px;
}

.version {
  color: #2d1b55;
  font-size: 18px;
  right: 40px;
  bottom: 2px;
}

.version-minion {
  bottom: -3px;
}
</style>
