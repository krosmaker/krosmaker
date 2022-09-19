<template>
  <v-layout class="statistics" row>
    <Statistic class="statistic-container" type="mp" />
    <Statistic class="statistic-container" type="hp" />
    <Statistic class="statistic-container" type="ap" />
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Statistics extends Vue {}
</script>

<style lang="scss" scoped>
.statistics {
  .statistic-container {
    padding-left: 6px;
    padding-right: 4px;
  }
}
</style>
