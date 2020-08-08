<template>
  <v-layout class="statistic-container" column justify-center align-center>
    <PlainInput
      class="statistic"
      :class="type"
      v-model="value"
      number
      :limit="type === 'hp' ? 2 : 1"
      :allowMinus="type !== 'hp'"
    />
    <span class="statistic-label" :class="`${type}-label`">{{ type }}</span>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class KrosmasterStatistic extends Vue {
  @Prop({ type: String, required: true })
  type!: "mp" | "hp" | "ap";

  get value(): string {
    return this.$store.state.krosmaster[this.type];
  }

  set value(value: string) {
    const type = this.type.toUpperCase();
    this.$store.commit(`krosmaster/set${type}`, value);
  }
}
</script>

<style lang="scss" scoped>
$shadow-size: 5px;
$statistics: (
  mp: #4d7015,
  hp: #a91313,
  ap: #2145ab,
);

.statistic-container {
  font-family: "Helvetica Neue";

  .statistic {
    text-align: center;
    -webkit-text-stroke: 1px white;
    color: white;
    font-size: 31px;
    font-weight: 900;
    width: 50px;
  }

  .hp {
    margin-left: -1px;
    margin-right: 1px;
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
    margin-top: -1.4em;
    font-size: 10px;
    font-weight: 900;
  }
}
</style>
