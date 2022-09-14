<template>
  <div
    class="power-container"
    ref="container"
    :class="{ 'minion-power-container': isMinion }"
    @click="selectPower(index)"
  >
    <div class="power-content">
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
      <PlainInput
        class="power-name"
        :class="{ 'power-name-windows': isWindows }"
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
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { Power } from "~/assets/src/data/fighters";
import { TabId } from "~/store/sidebar";
import { isWindows } from "~/assets/src/helpers";
import EventBus from "~/assets/src/events/bus";

@Component
export default class PowerContainer extends Vue {
  @Prop({ type: Object, required: true })
  power!: Power;
  @Prop({ type: Number, required: true })
  index!: number;

  observer: ResizeObserver = new ResizeObserver(() => {
    EventBus.$emit("abilityResize");
  });

  mounted() {
    this.observer.observe(this.$refs.container as Element);
  }

  beforeDestroy() {
    this.observer.unobserve(this.$refs.container as Element);
    this.observer.disconnect();
  }

  destroyed() {
    EventBus.$emit("abilityResize");
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
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0;
  margin-top: 4px;
  margin-bottom: -6px;

  .power-content {
    position: relative;
    background: url("~assets/img/front/descriptions/background.png") bottom
      center no-repeat;
    padding-bottom: 36px;

    $power-offset: 94px;

    .power-name-background {
      position: absolute;
      left: 50px;
      top: -10px;
    }

    .power-name {
      font-family: "Helvetica Neue";
      position: absolute;
      left: $power-offset;
      top: -2px;
      color: #252525;
      width: 840px;
      font-size: 38px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
    }

    .power-description {
      cursor: pointer;
      font-family: "Helvetica Neue";
      color: #303030;
      font-size: 28px;
      line-height: 34px;
      margin-left: $power-offset;
      margin-right: $power-offset;
      padding-top: 60px;
      font-weight: 400;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
    }

    .power-name-windows {
      margin-top: -4px;
    }
  }
}

.minion-power-container {
  $minion-power-offset: 76px;

  .power-content {
    width: $minion-card-width;
    background: url("~assets/img/front/descriptions/minion-background.png")
      bottom center no-repeat;
    padding-bottom: 18px;

    .power-name {
      left: $minion-power-offset;
    }

    .power-name-background {
      left: 22px;
      top: -30px;
    }

    .power-description {
      margin-left: $minion-power-offset;
      margin-right: $minion-power-offset;
      margin-bottom: 4px;
      -webkit-line-clamp: 3;
    }

    .power-name-windows {
      margin-top: -6px;
    }
  }
}
</style>
