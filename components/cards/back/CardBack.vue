<template>
  <div class="card-back" @click.stop="onCardClick">
    <img class="artwork" :src="cardImage" />
    <CardFrame class="frame" />
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

  .artwork {
    position: absolute;
    top: 16px;
    left: 23px;
    width: 475px;
    height: 337px;
  }

  .frame {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
}
</style>
