<template>
  <fragment>
    <Power
      v-for="(power, index) in powers"
      :key="index"
      :index="index"
      :power="power"
    />
  </fragment>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { Power } from "~/assets/src/data/fighters";
@Component
export default class Powers extends Vue {
  get powers(): Power[] {
    return this.$store.state.krosmaster.powers;
  }
}
</script>
