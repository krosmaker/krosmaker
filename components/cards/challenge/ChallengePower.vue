<template>
  <div class="power-container" ref="container" @click="selectPower(index)">
    <img
      class="power-background"
      src="~/assets/img/challenge/power-background.png"
    />
    <img
      class="name-background"
      :src="require(`~/assets/img/challenge/headers/${header}.png`)"
    />
    <img class="glyph-icon" src="~/assets/img/challenge/glyph.png" />
    <div
      class="header-text glyph-count"
      :class="{ 'power-offset-windows': isWindows }"
    >
      {{ power.glyphs }}x
    </div>
    <div
      class="header-text type-marker-container"
      :class="{ 'power-offset-windows': isWindows }"
    >
      <span class="fake-offset">{{ power.name }} </span>
      <span class="type-marker"
        >({{
          $t("card.edit." + (power.isActive ? "active" : "passive"))
        }})</span
      >
    </div>
    <PlainInput
      class="header-text power-name"
      :class="{ 'power-offset-windows': isWindows }"
      :value="power.name"
      @input="onNameChange($event, index)"
      :limit="40"
    />
    <Description
      class="power-description"
      :class="{ 'power-offset-windows': isWindows }"
      @click.native="openPower(index)"
      :content="power.description"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { TabId } from "~/store/sidebar";
import { isWindows } from "~/assets/src/helpers";
import { DivinePower } from "~/store/challenge";

type Header = "blue" | "magenta" | "navy";

@Component
export default class PowerContainer extends Vue {
  @Prop({ type: Number, required: true })
  index!: number;
  @Prop({ type: Object, required: true })
  power!: DivinePower;
  @Prop({ type: String, required: true })
  header!: Header;

  get isWindows(): boolean {
    return isWindows();
  }

  onNameChange(name: string, index: number) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("challenge/setPowerName", { index, name });
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
$power-offset: 40px;

.power-container {
  position: relative;
  height: 200px;
  padding: 0;
  margin: 0;

  .power-background {
    position: absolute;
    left: 0px;
    top: 43px;
  }

  .name-background {
    position: absolute;
    left: 0px;
    top: 0px;
    filter: drop-shadow(0px 4px 4px #00000090);
  }

  .header-text {
    font-family: "Helvetica Neue";
    font-size: 38px;
    color: #eeeeee;
    text-shadow: 2.5px 2.5px #111111;
    font-weight: 700;
  }

  .glyph-count {
    position: absolute;
    top: 22px;
    right: 198px;
  }

  .glyph-icon {
    position: absolute;
    top: 22px;
    right: 130px;
    filter: drop-shadow(0px 0px 4px #00000080);
  }

  .type-marker-container {
    pointer-events: none;
    position: absolute;
    top: 22px;
    left: $power-offset;

    .type-marker {
      font-style: italic;
      text-transform: lowercase;
    }

    .fake-offset {
      visibility: hidden;
    }
  }

  .power-name {
    position: absolute;
    top: 22px;
    left: $power-offset;
    width: 750px;
    white-space: nowrap;
    overflow: hidden;
  }

  .power-description {
    position: absolute;
    top: 80px;
    width: 876px;
    height: 126px;
    padding-top: 6px;
    cursor: pointer;
    font-family: "Helvetica Neue";
    color: #303030;
    font-size: 32px;
    line-height: 40px;
    left: $power-offset;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .power-offset-windows {
    margin-top: -4px;
  }
}
</style>
