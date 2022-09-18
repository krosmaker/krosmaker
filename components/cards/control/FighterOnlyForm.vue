<template>
  <fragment v-if="isFighter">
    <slot v-if="isFighter" />
  </fragment>
  <div v-else class="d-flex align-center justify-center pa-4 mt-4 mx-auto">
    {{ $t("card.edit.editorUnavailable") }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { CardType } from "~/store/card";

@Component
export default class FighterOnlyForm extends Vue {
  get isFighter(): boolean {
    return this.$store.state.card.type === CardType.FIGHTER;
  }
}
</script>
