<template>
  <div class="name-container">
    <input class="name" type="text" maxlength="30" v-model="content" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class ChallengeName extends Vue {
  get content(): string {
    return this.$store.state.challenge.name;
  }

  set content(content: string) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("challenge/setName", content);
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
    color: #1d1c18;
    text-align: center;
  }
}
</style>
