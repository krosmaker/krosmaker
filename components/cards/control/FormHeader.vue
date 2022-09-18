<template>
  <h2 class="pa-3">{{ $t(title) }}</h2>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class FormHeader extends Vue {
  @Prop({ type: String, required: true })
  title!: string;
}
</script>
