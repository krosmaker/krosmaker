<template>
  <div class="card-back">
    <CardBackground
      class="frame"
      :smallImage="require('~/assets/img/favor/favor-back.png')"
    />
    <CardContentContainer>
      <div class="watermark">@Krosmaker</div>
      <div class="version">{{ version }}</div>
    </CardContentContainer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class FavorBack extends Vue {
  get version(): string {
    return this.$store.state.card.version || "";
  }
}
</script>

<style lang="scss" scoped>
.card-back {
  overflow: hidden;
  border-radius: inherit;

  .watermark,
  .version {
    font-family: "Helvetica Neue", "Verdana";
    letter-spacing: 0.5px;
    color: #a46ec399;
  }

  .watermark {
    position: absolute;
    left: 764px;
    top: 315px;
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
