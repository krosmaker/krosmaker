<template>
  <fragment>
    <Spell
      v-for="(spell, index) in spells"
      :key="index"
      :index="index"
      :spell="spell"
    />
  </fragment>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { Spell } from "~/assets/src/data/fighters";

@Component
export default class Spells extends Vue {
  get spells(): Spell[] {
    return this.$store.state.krosmaster.spells;
  }
}
</script>
