<template>
  <v-layout class="statistics" row>
    <KrosmasterStatistic class="statistic-container" type="mp" />
    <KrosmasterStatistic class="statistic-container" type="hp" />
    <KrosmasterStatistic class="statistic-container" type="ap" />
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class KrosmasterStatistics extends Vue {}
</script>

<style lang="scss" scoped>
.statistics {
  .statistic-container {
    padding-left: 3px;
    padding-right: 2px;
  }
}
</style>
