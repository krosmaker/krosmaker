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
    <div class="suffix suffix-shadow" v-if="isTwoSided && suffix">
      <span class="suffix-offset">{{ content }}</span>
      <span class="name-shadow">- {{ suffix }}</span>
    </div>
    <div class="suffix" v-if="isTwoSided && suffix">
      <span class="suffix-offset">{{ content }}</span>
      <svg class="suffix-elite" v-if="isElite">
        <text class="suffix-elite-text" x="0" y="48">- {{ suffix }}</text>
      </svg>
      <span class="suffix-text" v-else>- {{ suffix }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import AbstractFighterComponent from "~/components/cards/fighter/AbstractFighterComponent";

@Component
export default class FighterName extends AbstractFighterComponent {
  get isTwoSided(): boolean {
    return this.fighterState.twoSided;
  }

  get content(): string {
    return this.fighterState.name;
  }

  set content(content: string) {
    this.setDirty();
    // Names are shared by both card sides:
    this.$store.commit("fighter/setName", content);
    this.$store.commit("reverse/setName", content);
  }

  get suffix(): string {
    return this.fighterState.suffix;
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

  .suffix {
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;

    .name-shadow {
      position: static;
      text-transform: capitalize;
    }

    .suffix-offset {
      visibility: hidden;
    }

    .suffix-elite {
      height: 80px;

      .suffix-elite-text {
        text-transform: capitalize;
        fill: url(#elite-name-gradient);
        user-select: none;
      }
    }

    .suffix-text {
      text-transform: capitalize;
    }
  }

  .suffix-shadow {
    left: 1px;
    top: 1px;
  }
}
</style>
