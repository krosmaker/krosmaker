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
    top: 16px;
    left: 23px;
    width: 475px;
    height: 337px;
  }

  .artwork-minion {
    position: absolute;
    top: 12px;
    left: 17px;
    width: 368px;
    height: 233px;
  }

  .frame {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .watermark {
    font-family: "Verdana";
    color: #c39822;
    font-size: 10px;
    transform: rotate(-90deg);

    position: absolute;
    right: -21px;
    top: 48%;
  }

  .watermark-minion {
    right: -24px;
  }
}
</style>
