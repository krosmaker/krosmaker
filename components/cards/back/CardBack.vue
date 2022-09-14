<template>
  <div class="card-back" @click.stop="onCardClick">
    <img
      :class="{ artwork: isKrosmaster, 'artwork-minion': !isKrosmaster }"
      :src="cardImage"
    />
    <CardFrame class="frame" />
    <div :class="{ watermark: true, 'watermark-minion': !isKrosmaster }">
      @Krosmaker
    </div>
    <div :class="{ version: true, 'version-minion': !isKrosmaster }">
      {{ version }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { TabId } from "~/store/sidebar";

@Component
export default class CardBack extends Vue {
  get cardImage(): string {
    const background = this.$store.state.background;
    return background.useCropped ? background.cropped : background.original;
  }

  get isKrosmaster(): boolean {
    return this.$store.state.krosmaster.type !== "minion";
  }

  get version(): string {
    return this.$store.state.krosmaster.version || "";
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
    top: 27px;
    left: 28px;
    width: 735px;
    height: 464px;
  }

  .frame {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: inherit;
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
    top: 320px;
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
