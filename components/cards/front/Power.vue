<template>
  <div
    class="power-container"
    ref="container"
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
  width: 100%;
  padding: 0;
  margin: 0;
  margin-top: 1px;
  margin-bottom: -27px;

  .power-name-background {
    margin-left: 25px;
    margin-bottom: -36px;
  }

  .power-content {
    background: url("~assets/img/front/descriptions/background.png") bottom
      center no-repeat;
    padding-bottom: 18px;
    margin-top: 1px;

    $power-offset: 47px;

    .power-name {
      font-family: "Helvetica Neue";
      margin-left: $power-offset;
      margin-top: -2px;
      margin-bottom: -1px;
      color: #252525;
      width: 420px;
      font-size: 19px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
    }

    .power-description {
      cursor: pointer;
      font-family: "Helvetica Neue";
      color: #303030;
      font-size: 14px;
      line-height: 17px;
      margin-left: $power-offset;
      margin-right: $power-offset;
      min-height: 27px;
      padding-top: 5px;
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
    .power-description-windows {
      margin-top: -1px;
    }
  }
}

.minion-power-container {
  .power-name-background {
    margin-left: 15px;
    margin-bottom: -48px;
    padding-bottom: 2px;
  }

  $minion-power-offset: 40px;

  .power-content {
    width: $minion-card-width;
    background: url("~assets/img/front/descriptions/minion-background.png")
      bottom center no-repeat;
    padding-bottom: 5px;

    .power-name {
      margin-left: $minion-power-offset;
    }

    .power-description {
      margin-left: $minion-power-offset;
      margin-right: 36px;
      margin-bottom: 4px;
      padding-bottom: 1px;
      -webkit-line-clamp: 3;
    }

    .power-name-windows {
      margin-top: -4px;
      margin-bottom: 2px;
    }
    .power-description-windows {
      margin-top: -2px;
      padding-bottom: 3px;
    }
  }
}
</style>
