<template>
  <fragment v-if="isKrosmaster">
    <Power
      v-for="(power, index) in powers"
      :key="index"
      :index="index"
      :power="power"
      :store="store"
    />
  </fragment>
  <fragment v-else-if="hasNoSpells && powers.length > 0">
    <Power :index="0" :power="powers[0]" :store="store" />
  </fragment>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import AbstractFighterComponent from "./AbstractFighterComponent";
import { Power } from "~/assets/src/data/fighters";

@Component
export default class Powers extends AbstractFighterComponent {
  get powers(): Power[] {
    return this.fighterState.powers;
  }

  get hasNoSpells(): boolean {
    return this.fighterState.spells.length === 0;
  }
}
</script>
