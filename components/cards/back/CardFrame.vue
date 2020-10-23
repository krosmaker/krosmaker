<template>
  <fragment>
    <img v-if="isKrosmaster" src="~/assets/img/back/frame.png" />
    <img v-else src="~/assets/img/back/frame-minion.png" />
  </fragment>
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
