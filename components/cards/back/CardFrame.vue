<template>
  <div>
    <img v-if="isKrosmaster" class="frame" src="~/assets/img/back/frame.png" />
    <img v-else class="frame" src="~/assets/img/back/frame-minion.png" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class BackgroundFrame extends Vue {
  get isKrosmaster(): boolean {
    return this.$store.state.krosmaster.type !== "minion";
  }
}
</script>

<style lang="scss" scoped>
.frame {
  border-radius: inherit;
}
</style>
