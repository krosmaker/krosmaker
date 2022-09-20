<template>
  <fragment v-if="isFighter">
    <slot />
  </fragment>
  <div v-else class="d-flex align-center justify-center pa-4 mt-4 mx-auto">
    {{ $t("card.edit.editorUnavailable") }}
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import AbstractForm from "~/components/cards/control/AbstractForm";

@Component
export default class FighterOnlyForm extends AbstractForm {}
</script>
