<template>
  <fragment v-if="isKrosmaster">
    <Spell
      v-for="(spell, index) in spells"
      :key="index"
      :index="index"
      :spell="spell"
      :store="store"
    />
  </fragment>
  <fragment v-else>
    <Spell
      v-if="spells.length > 0"
      :index="0"
      :spell="spells[0]"
      :store="store"
    />
  </fragment>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import AbstractFighterComponent from "./AbstractFighterComponent";
import { Spell } from "~/assets/src/data/fighters";

@Component
export default class Spells extends AbstractFighterComponent {
  get spells(): Spell[] {
    return this.fighterState.spells;
  }
}
</script>
