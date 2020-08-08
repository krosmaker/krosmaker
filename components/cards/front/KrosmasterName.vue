<template>
  <div class="name-container">
    <div class="name-shadow">{{ content }}</div>
    <input
      class="name"
      :class="{ elite: isElite, common: !isElite }"
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
export default class KrosmasterName extends Vue {
  get content(): string {
    return this.$store.state.krosmaster.name;
  }

  set content(content: string) {
    this.$store.commit("krosmaster/setName", content);
  }

  get isElite(): boolean {
    return this.$store.state.krosmaster.isElite;
  }
}
</script>

<style lang="scss" scoped>
.name-container {
  font-family: "Berlin Sans";
  text-transform: uppercase;
  font-size: 22px;
  width: $card-width;

  .name {
    white-space: nowrap;
    text-transform: uppercase;
    outline: 0px solid transparent;
    position: absolute;
    left: 0;
    top: 0;
    width: $card-width * 0.75;
  }

  .common {
    color: #eee;
  }

  .elite {
    background-image: linear-gradient(
      #eee 38%,
      #fabc38 41%,
      #fdcc35 43%,
      #cb883d 55%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .name-shadow {
    color: #000;
    text-shadow: 2px 2px 4px #000, 2px 2px 4px #000;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
