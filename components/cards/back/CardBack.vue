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
    top: 16px;
    left: 23px;
    width: 475px;
    height: 337px;
  }

  .artwork-minion {
    position: absolute;
    top: 13px;
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

  .watermark,
  .version {
    position: absolute;
    font-family: "Helvetica Neue", "Verdana";
    letter-spacing: 0.5px;
    font-size: 10px;
  }

  .watermark {
    color: #c39822;
    transform: rotate(-90deg);
    transform-origin: 0 0;

    left: 96.5%;
    top: 59%;
  }

  .watermark-minion {
    left: 96.3%;
    top: 62%;
  }

  .version {
    color: #aa8213;
    left: 91%;
    bottom: 0.4%;
  }

  .version-minion {
    left: 90%;
    bottom: -0.6%;
  }
}
</style>
