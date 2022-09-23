<template>
  <div class="card-back" @click.stop="onCardClick">
    <CardBackground
      class="background"
      :image="require('~/assets/img/challenge/background.png')"
    />
    <CardBackground class="background" :image="artwork" />
    <CardContentContainer>
      <div class="watermark">@Krosmaker</div>
      <div class="version">{{ version }}</div>
    </CardContentContainer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { TabId } from "~/store/sidebar";

@Component
export default class ChallengeBack extends Vue {
  get artwork(): string {
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

  .background {
    position: absolute;
  }

  .watermark,
  .version {
    font-family: "Helvetica Neue", "Verdana";
    letter-spacing: 0.5px;
    color: #a46ec399;
  }

  .watermark {
    position: absolute;
    left: 1003px;
    top: 440px;
    font-family: "Helvetica Neue", "Verdana";
    font-size: 20px;
    letter-spacing: 0.5px;
    transform: rotate(-90deg);
    transform-origin: 0 0;
    color: #a46ec399;
  }

  .version {
    position: absolute;
    font-size: 18px;
    right: 32px;
    bottom: 2px;
  }
}
</style>
