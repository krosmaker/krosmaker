<template>
  <div class="name-container">
    <div class="name-shadow">{{ content }}</div>
    <svg class="elite-name" v-if="isElite">
      <linearGradient id="elite-name-gradient" gradientTransform="rotate(90)">
        <stop offset="38%" stop-color="#eeeeee" />
        <stop offset="41%" stop-color="#fabc38" />
        <stop offset="43%" stop-color="#fdcc35" />
        <stop offset="55%" stop-color="#cb883d" />
      </linearGradient>
      <text class="elite-name-text" x="0" y="48">{{ content }}</text>
    </svg>
    <input
      class="name"
      :class="{
        elite: isElite,
        common: !isElite,
      }"
      type="text"
      maxlength="30"
      v-model="content"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class FighterName extends Vue {
  get content(): string {
    return this.$store.state.krosmaster.name;
  }

  set content(content: string) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("krosmaster/setName", content);
  }

  get isElite(): boolean {
    return this.$store.state.krosmaster.type === "elite";
  }
}
</script>

<style lang="scss" scoped>
$name-width: 980px;

.name-container {
  font-family: "Berlin Sans";
  text-transform: uppercase;
  font-size: 44px;
  width: $card-width;
  white-space: pre;

  .name {
    white-space: nowrap;
    text-transform: uppercase;
    outline: 0px solid transparent;
    position: absolute;
    left: 0;
    top: 0;
    width: $name-width;
  }

  .common {
    color: #eee;
  }

  .elite {
    -webkit-text-fill-color: transparent;
  }

  $shadow-color: #000000bb;

  .name-shadow {
    color: black;
    -webkit-text-fill-color: transparent;
    text-shadow: -1px -1px 1px $shadow-color, -1px -1px 2px $shadow-color,
      1px 1px 2px $shadow-color, 1px 1px 3px $shadow-color;
    position: absolute;
    left: 1px;
    top: 1px;
    user-select: none;
  }

  .elite-name {
    position: absolute;
    width: $name-width;
    height: 80px;
    left: 0;
    top: 0;

    .elite-name-text {
      fill: url(#elite-name-gradient);
      user-select: none;
    }
  }
}
</style>
