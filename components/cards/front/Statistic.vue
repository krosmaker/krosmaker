<template>
  <v-layout
    class="statistic-container"
    :class="{ 'minion-statistic-container': isMinion }"
    column
    justify-center
    align-center
  >
    <PlainInput
      class="statistic"
      :class="[type, { 'statistic-windows': isWindows }]"
      v-model="value"
      number
      :limit="type === 'hp' ? 2 : 1"
      :allowMinus="true"
    />
    <span
      class="statistic-label"
      :class="[`${type}-label`, { 'statistic-label-windows': isWindows }]"
    >
      {{ $t("card." + type) }}
    </span>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { isWindows } from "~/assets/src/helpers";

@Component
export default class Statistic extends Vue {
  @Prop({ type: String, required: true })
  type!: "mp" | "hp" | "ap";

  get value(): string {
    return this.$store.state.krosmaster[this.type];
  }

  set value(value: string) {
    const type = this.type.toUpperCase();
    this.$store.commit("export/setDirty", true);
    if (value === "" || value === "-" || !isNaN(parseInt(value))) {
      this.$store.commit(`krosmaster/set${type}`, value);
    }
  }

  get isMinion(): boolean {
    return this.$store.state.krosmaster.type === "minion";
  }

  get isWindows(): boolean {
    return isWindows();
  }
}
</script>

<style lang="scss" scoped>
$shadow-size: 10px;
$statistics: (
  mp: #4d7015,
  hp: #d42637,
  ap: #2145ab,
);

.statistic-container {
  font-family: "Helvetica Neue";

  .statistic {
    text-align: center;
    -webkit-text-stroke: 1px white;
    color: white;
    font-size: 62px;
    font-weight: 900;
    width: 100px;
  }

  .statistic-windows {
    font-size: 60px;
    margin-top: -8px;
    margin-bottom: 8px;
    font-weight: 600;
  }

  .hp {
    margin-left: -2px;
    margin-right: 2px;
  }

  @each $statistic, $color in $statistics {
    .#{$statistic},
    .#{$statistic}-label {
      text-shadow: 0px 0px $shadow-size #{$color},
        0px 0px $shadow-size #{$color}, 0px 0px $shadow-size #{$color},
        0px 0px $shadow-size #{$color}, 0px 0px $shadow-size #{$color},
        0px 0px $shadow-size #{$color};
    }
  }

  .statistic-label {
    text-transform: uppercase;
    margin-top: -30px;
    font-size: 20px;
    font-weight: 900;
    letter-spacing: 1px;
  }

  .statistic-label-windows {
    font-weight: 600;
  }
}

.minion-statistic-container {
  .statistic {
    font-size: 74px;
  }

  .statistic-label {
    margin-top: -34px;
  }

  margin-left: 2px;
  margin-right: 32px;
}
</style>
