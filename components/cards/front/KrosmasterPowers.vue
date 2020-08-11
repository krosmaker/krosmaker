<template>
  <fragment>
    <div
      v-for="(power, index) in powers"
      :key="index"
      class="power-container"
      @click="selectPower(index)"
    >
      <img
        class="power-name-background"
        src="~/assets/img/front/powers/header.png"
      />
      <div class="power-content">
        <PlainInput
          class="power-name"
          :value="power.name"
          @input="onNameChange($event, index)"
          :limit="40"
        />
        <Description
          class="power-description"
          @click.native="openPower(index)"
          :content="power.description"
        />
      </div>
    </div>
  </fragment>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { Component } from "vue-property-decorator";

import { Power } from "~/store/krosmaster";
import { maxAbilitiesCount } from "~/assets/src/constants";
import { TabId } from "~/store/sidebar";

@Component
export default class PowersForm extends Vue {
  get powers(): Power[] {
    return this.$store.state.krosmaster.powers;
  }

  onNameChange(name: string, index: number) {
    this.$store.commit("krosmaster/setPowerName", { index, name });
  }

  selectPower(index: number) {
    this.$store.commit("sidebar/setActivePower", index);
  }

  openPower(index: number) {
    const store = this.$store;
    store.commit("sidebar/setActivePower", index);
    store.commit("sidebar/setActiveTab", TabId.POWERS);
    store.commit("sidebar/setExpand", true);
  }
}
</script>

<style lang="scss" scoped>
.power-container {
  width: 100%;
  padding: 0;
  margin: 0;
  margin-bottom: -3.75%;

  .power-name-background {
    margin-left: 4.7%;
    margin-bottom: -7%;
  }

  .power-content {
    background: url("~assets/img/front/descriptions/background.png") bottom
      center no-repeat;
    padding-bottom: 8px;

    .power-name {
      font-family: "Helvetica Neue";
      margin-left: 9%;
      margin-bottom: -2px;
      color: #252525;
      width: $card-width * 0.8;
      font-weight: 700;
      font-size: 19px;
      white-space: nowrap;
      overflow: hidden;
    }

    .power-description {
      cursor: pointer;
      font-family: "Helvetica Neue";
      color: #303030;
      font-size: 15px;
      line-height: 17px;
      margin-left: 9%;
      margin-right: 9%;
      min-height: 25px;
      padding-top: 1%;
      font-weight: 400;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
