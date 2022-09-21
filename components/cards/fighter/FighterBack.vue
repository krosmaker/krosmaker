<template>
  <FighterFront store="reverse" v-if="isTwoSided" />
  <div class="card-back" @click.stop="onCardClick" v-else>
    <CardContentContainer>
      <img
        :class="{ artwork: isKrosmaster, 'artwork-minion': isMinion }"
        :src="cardImage"
      />
    </CardContentContainer>
    <CardBackground
      class="frame"
      :image="require('~/assets/img/back/frame.png')"
      :smallImage="require('~/assets/img/back/frame-minion.png')"
    />
    <CardContentContainer>
      <div :class="{ watermark: true, 'watermark-minion': isMinion }">
        @Krosmaker
      </div>
      <div :class="{ version: true, 'version-minion': isMinion }">
        {{ version }}
      </div>
    </CardContentContainer>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import AbstractFighterComponent from "~/components/cards/fighter/AbstractFighterComponent";
import { TabId } from "~/store/sidebar";

@Component
export default class FighterBack extends AbstractFighterComponent {
  get isTwoSided(): boolean {
    return this.$store.state.fighter.twoSided;
  }

  get cardImage(): string {
    const background = this.$store.state.background;
    return background.useCropped ? background.cropped : background.original;
  }

  get version(): string {
    return this.$store.state.card.version || "";
  }

  onCardClick() {
    const store = this.$store;
    store.commit("sidebar/setExpand", true);
    store.commit("sidebar/setActiveTab", TabId.ARTWORK);
  }
}
</script>

<style lang="scss" scoped>
.card-back {
  cursor: pointer;
  overflow: hidden;
  border-radius: inherit;

  .artwork {
    position: absolute;
    top: 31px;
    left: 44px;
    width: 950px;
    height: 675px;
  }

  .artwork-minion {
    position: absolute;
    top: 28px;
    left: 28px;
    width: 735px;
    height: 466px;
  }

  .frame {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .watermark,
  .version {
    position: absolute;
    font-family: "Helvetica Neue", "Verdana";
    letter-spacing: 0.5px;
  }

  .watermark {
    font-size: 20px;
    color: #c39822;
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
    font-size: 18px;
    color: #aa8213;
    right: 45px;
    bottom: 2px;
  }

  .version-minion {
    bottom: -3px;
  }
}
</style>
