<template>
  <input
    ref="input"
    type="text"
    :value="value"
    :maxlength="limit"
    @keydown="onKeyPress"
    @paste="onPaste"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import {
  preventNonNumericInput,
  preventNonNumericPaste,
} from "~/assets/src/helpers";

/**
 * An input that looks like regular text.
 */
@Component
export default class PlainInput extends Vue {
  @Prop({ type: String })
  value!: string;

  @Prop({ type: Boolean, default: false })
  number!: boolean;

  @Prop({ type: Boolean, default: false })
  allowMinus!: boolean;

  @Prop({ type: Number, default: 100 })
  limit!: number;

  get input(): HTMLInputElement {
    return this.$refs.input as HTMLInputElement;
  }

  onKeyPress(event: KeyboardEvent) {
    if (this.number) {
      preventNonNumericInput(event, this.allowMinus);
    }
  }

  onPaste(event: ClipboardEvent) {
    if (this.number) {
      preventNonNumericPaste(event, this.allowMinus);
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  white-space: nowrap;
  text-transform: uppercase;
  outline: 0px solid transparent;
  caret-color: white;
  font-weight: inherit;
  font-family: inherit;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
