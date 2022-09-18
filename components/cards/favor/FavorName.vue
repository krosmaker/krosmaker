<template>
  <div class="name-container">
    <div class="name-shadow">{{ content }}</div>
    <input class="name" type="text" maxlength="25" v-model="content" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class FavorName extends Vue {
  get content(): string {
    return this.$store.state.favor.name;
  }

  set content(content: string) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("favor/setName", content);
  }
}
</script>

<style lang="scss" scoped>
.name-container {
  font-family: "Berlin Sans";
  text-transform: uppercase;
  font-size: 44px;
  width: 100%;
  white-space: pre;

  .name {
    white-space: nowrap;
    text-transform: uppercase;
    outline: 0px solid transparent;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    color: #eee;
    text-align: center;
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
    width: 100%;
    text-align: center;
  }
}
</style>
