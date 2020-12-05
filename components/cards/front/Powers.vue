<template>
  <fragment>
    <div
      v-for="(power, index) in powers"
      :key="index"
      class="power-container"
      :class="{ 'minion-power-container': isMinion }"
      @click="selectPower(index)"
    >
      <img
        v-if="isMinion"
        class="power-name-background"
        src="~/assets/img/front/powers/minion-header.png"
      />
      <img
        v-else
        class="power-name-background"
        src="~/assets/img/front/powers/header.png"
      />

      <div class="power-content">
        <PlainInput
          class="power-name"
          :class="{ 'power-name-windows': isWindows }"
          :value="power.name"
          @input="onNameChange($event, index)"
          :limit="40"
        />
        <Description
          class="power-description"
          :class="{ 'power-description-windows': isWindows }"
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

import { Power } from "~/assets/src/data/fighters";
import { maxAbilitiesCount } from "~/assets/src/constants";
import { TabId } from "~/store/sidebar";
import { isWindows } from "~/assets/src/helpers";

@Component
export default class Powers extends Vue {
  get powers(): Power[] {
    return this.$store.state.krosmaster.powers;
  }

  get isMinion(): boolean {
    return this.$store.state.krosmaster.type === "minion";
  }

  get isWindows(): boolean {
    return isWindows();
  }

  onNameChange(name: string, index: number) {
    this.$store.commit("export/setDirty", true);
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
  margin-bottom: -5%;

  .power-name-background {
    margin-left: 4.7%;
    margin-bottom: -7%;
  }

  .power-content {
    background: url("~assets/img/front/descriptions/background.png") bottom
      center no-repeat;
    padding-bottom: 18px;
    margin-top: 2px;

    .power-name {
      font-family: "Helvetica Neue";
      margin-left: 9%;
      margin-top: -2px;
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
      padding-top: 0.9%;
      font-weight: 400;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
    }

    .power-name-windows,
    .power-description-windows {
      margin-top: -4px;
    }
  }
}

.minion-power-container {
  .power-name-background {
    margin-left: 2.8%;
    margin-bottom: -9.2%;
    padding-bottom: 2px;
  }

  .power-content {
    width: $minion-card-width;
    background: url("~assets/img/front/descriptions/minion-background.png")
      bottom center no-repeat;
    padding-bottom: 5px;

    .power-name {
      margin-left: 10%;
    }

    .power-description {
      margin-left: 10%;
      margin-right: 8.9%;
      margin-bottom: 4px;
      padding-bottom: 1px;
      -webkit-line-clamp: 3;
    }

    .power-name-windows {
      margin-top: -4px;
      margin-bottom: 2px;
    }
    .power-description-windows {
      padding-bottom: 3px;
    }
  }
}
</style>
