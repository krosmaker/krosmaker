<template>
  <v-layout class="statistics" row>
    <Statistic class="statistic-container" type="mp" :store="store" />
    <Statistic class="statistic-container" type="hp" :store="store" />
    <Statistic class="statistic-container" type="ap" :store="store" />
  </v-layout>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import AbstractFighterComponent from "./AbstractFighterComponent";
@Component
export default class Statistics extends AbstractFighterComponent {}
</script>

<style lang="scss" scoped>
.statistics {
  .statistic-container {
    padding-left: 6px;
    padding-right: 4px;
  }
}
</style>
