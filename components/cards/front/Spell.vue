<template>
  <div
    class="spell-container"
    ref="container"
    :class="{ 'minion-spell-container': isMinion }"
    @click="selectSpell(index)"
  >
    <img
      class="spell-range-background"
      src="~/assets/img/front/spells/ranges/special.png"
      v-if="spell.range.type === 'special'"
    />
    <img
      class="spell-range-background"
      src="~/assets/img/front/spells/ranges/regular.png"
      v-else
    />
    <div
      class="spell-range"
      :class="{ 'spell-range-windows': isWindows }"
      v-if="spell.range.type === 'regular'"
    >
      <PlainInput
        number
        :limit="1"
        :value="`${spell.range.value[0]}`"
        @input="onRangeFromChange($event, index)"
      />
      <span>-</span>
      <PlainInput
        number
        :limit="1"
        :value="`${spell.range.value[1]}`"
        @input="onRangeToChange($event, index)"
      />
    </div>

    <div
      class="spell-limit"
      :class="{
        'spell-limit-extended': spell.damage.element === 'none',
        'spell-limit-windows': isWindows,
      }"
      v-if="spell.limit.type !== 'none'"
    >
      <PlainInput
        number
        :limit="1"
        :value="`${spell.limit.value}`"
        @input="onLimitChange($event, index)"
      />
      <span>/</span>
      <span class="spell-limit-turn" v-if="spell.limit.type === 'turn'"></span>
      <span class="spell-limit-target" v-else></span>
    </div>

    <img
      class="spell-damage-background"
      src="~/assets/img/front/spells/elements/air.png"
      v-if="spell.damage.element === 'air'"
    />
    <img
      class="spell-damage-background"
      src="~/assets/img/front/spells/elements/earth.png"
      v-if="spell.damage.element === 'earth'"
    />
    <img
      class="spell-damage-background"
      src="~/assets/img/front/spells/elements/fire.png"
      v-if="spell.damage.element === 'fire'"
    />
    <img
      class="spell-damage-background"
      src="~/assets/img/front/spells/elements/water.png"
      v-if="spell.damage.element === 'water'"
    />
    <PlainInput
      number
      class="spell-damage-value"
      :class="{ 'spell-damage-value-windows': isWindows }"
      v-if="spell.damage.element !== 'none'"
      :limit="1"
      :value="`${spell.damage.value}`"
      @input="onDamageChange($event, index)"
    />

    <img
      v-if="isMinion"
      class="spell-name-background"
      src="~/assets/img/front/spells/minion-header.png"
    />
    <img
      v-else
      class="spell-name-background"
      src="~/assets/img/front/spells/header.png"
    />
    <div class="spell-content">
      <PlainInput
        class="spell-name"
        :class="{ 'spell-name-windows': isWindows }"
        :value="spell.name"
        @input="onNameChange($event, index)"
        :limit="40"
      />
      <Description
        class="spell-description"
        :class="{
          'spell-description-extended': spell.damage.element === 'none',
          'spell-description-windows': isWindows,
        }"
        :addOffset="true"
        :content="spell.description"
        @click.native="openSpell(index)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { Spell } from "~/assets/src/data/fighters";
import { TabId } from "~/store/sidebar";
import { isWindows } from "~/assets/src/helpers";
import EventBus from "~/assets/src/events/bus";

@Component
export default class SpellContainer extends Vue {
  @Prop({ type: Object, required: true })
  spell!: Spell;
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
    this.$store.commit("krosmaster/setSpellName", { index, name });
  }

  onLimitChange(value: string, index: number) {
    const limit = parseInt(value);
    if (value && !isNaN(limit)) {
      this.$store.commit("export/setDirty", true);
      this.$store.commit("krosmaster/setSpellLimit", { index, limit });
    }
  }

  onRangeFromChange(value: string, index: number) {
    const rangeFrom = parseInt(value);
    if (value && !isNaN(rangeFrom)) {
      const range = this.$store.state.krosmaster.spells[index].range.value;
      const rangeTo = Math.max(range[1], rangeFrom);
      this.$store.commit("export/setDirty", true);
      this.$store.commit("krosmaster/setSpellRange", {
        index,
        range: [rangeFrom, rangeTo],
      });
    }
  }

  onRangeToChange(value: string, index: number) {
    const rangeTo = parseInt(value);
    if (value && !isNaN(rangeTo)) {
      const range = this.$store.state.krosmaster.spells[index].range.value;
      const rangeFrom = Math.min(range[0], rangeTo);
      this.$store.commit("export/setDirty", true);
      this.$store.commit("krosmaster/setSpellRange", {
        index,
        range: [rangeFrom, rangeTo],
      });
    }
  }

  onDamageChange(value: string, index: number) {
    const damage = parseInt(value);
    if (value && !isNaN(damage)) {
      this.$store.commit("export/setDirty", true);
      this.$store.commit("krosmaster/setSpellDamage", { index, damage });
    }
  }

  selectSpell(index: number) {
    this.$store.commit("sidebar/setActiveSpell", index);
  }

  openSpell(index: number) {
    const store = this.$store;
    store.commit("sidebar/setActiveSpell", index);
    store.commit("sidebar/setActiveTab", TabId.SPELLS);
    store.commit("sidebar/setExpand", true);
  }
}
</script>

<style lang="scss" scoped>
.spell-container {
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0;
  margin-bottom: -28px;

  .spell-range-background {
    position: absolute;
    top: 24px;
    left: 29px;
    border-radius: 5px;
    width: 50px;
    height: 50px;
  }

  .spell-range {
    font-family: "Helvetica Neue";
    position: absolute;
    top: 54px;
    left: 26px;
    font-size: 18px;
    font-weight: 700;
    display: inline;

    > input {
      color: white;
      display: inline-block;
      width: 9px;
      margin-left: 6px;
      margin-right: 6px;
    }
  }

  .spell-range-windows {
    margin-top: -3px;
  }

  .spell-limit {
    font-family: "Helvetica Neue";
    position: absolute;
    top: 24px;
    left: 416px;
    font-size: 22px;
    font-weight: bold;
    display: inline;

    input,
    span {
      display: inline-block;
      margin-left: -1px;
      margin-right: -2px;
    }
    input {
      color: white;
      width: 12px;
    }
    .spell-limit-turn {
      display: inline-block;
      vertical-align: middle;
      background-image: url("~assets/img/front/spells/limits/turn.png");
      width: 13px;
      height: 18px;
      margin-left: 1px;
      margin-bottom: 4px;
    }
    .spell-limit-target {
      display: inline-block;
      vertical-align: middle;
      background-image: url("~assets/img/front/spells/limits/target.png");
      width: 19px;
      height: 19px;
      margin-bottom: 3px;
      margin-left: -2px;
    }
  }

  .spell-limit-extended {
    left: 432px;
  }

  .spell-limit-windows {
    top: 21px;
    .spell-limit-turn {
      margin-bottom: 6px;
    }
    .spell-limit-target {
      margin-bottom: 5px;
    }
  }

  .spell-damage-background {
    position: absolute;
    top: 42px;
    left: 448px;
  }

  $spell-damage-shadow: #222233;

  .spell-damage-value {
    font-family: "Helvetica Neue";
    position: absolute;
    color: white;
    top: 49px;
    left: 465px;
    width: 32px;
    font-size: 32px;
    font-weight: bold;
    overflow: visible;
    caret-color: transparent;
    filter: drop-shadow(-1px -1px 0px $spell-damage-shadow)
      drop-shadow(1px -1px 0px $spell-damage-shadow)
      drop-shadow(-1px 1px 0px $spell-damage-shadow)
      drop-shadow(1px 1px 0px $spell-damage-shadow);
  }

  .spell-damage-value-windows {
    margin-top: -5px;
  }

  .spell-name-background {
    margin-left: 73px;
    margin-bottom: -37px;
  }

  .spell-content {
    background: url("~assets/img/front/descriptions/background.png") bottom
      center no-repeat;
    padding-bottom: 18px;
    margin-top: 2px;

    .spell-name {
      font-family: "Helvetica Neue";
      color: #eeeeee;
      text-shadow: 2px 2px #111111;
      margin-left: 86px;
      margin-top: -2px;
      margin-bottom: 1px;
      width: 360px;
      font-weight: 700;
      font-size: 19px;
      white-space: nowrap;
      overflow: hidden;
    }

    $spell-offset: 47px;

    .spell-description {
      cursor: pointer;
      font-family: "Helvetica Neue";
      color: #303030;
      font-size: 14px;
      line-height: 17px;
      margin-left: $spell-offset;
      margin-right: 73px;
      min-height: 29px;
      padding-top: 5px;
      font-weight: 400;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
    }

    .spell-name-windows {
      margin-top: -4px;
      font-weight: 400;
      letter-spacing: 0.75px;
      text-shadow: 2.4px 2px #111111;
    }
    .spell-description-windows {
      margin-top: -1px;
      min-height: 33px;
    }

    .spell-description-extended {
      margin-right: $spell-offset;
      min-height: 24px;
    }
    .spell-description-windows.spell-description-extended {
      min-height: 28px;
    }
  }
}

.minion-spell-container {
  .spell-content {
    width: $minion-card-width;
    background: url("~assets/img/front/descriptions/minion-background.png")
      bottom center no-repeat;
    padding-bottom: 5px;

    .spell-name {
      width: 280px;
      margin-left: 77px;
      margin-top: -2px;
      margin-bottom: 5px;
    }

    .spell-description {
      padding-top: 4px;
      margin-top: -4px;
      margin-left: 38px;
      margin-bottom: 4px;
      margin-right: 76px;
      min-height: 30px;
      -webkit-line-clamp: 3;
    }

    .spell-description-extended {
      margin-right: 33px;
      min-height: 28px;
    }

    .spell-name-windows {
      margin-top: -4px;
      margin-bottom: 6px;
    }
    .spell-description-windows {
      padding-bottom: 2px;
      min-height: 33px;
    }
  }

  .spell-range-background {
    left: 21px;
  }

  .spell-range {
    left: 18px;
  }

  .spell-damage-background {
    top: 34px;
    left: 325px;
  }

  .spell-damage-value {
    top: 40px;
    left: 342px;
  }

  .spell-limit {
    top: 22px;
    left: 286px;
  }

  .spell-limit-extended {
    left: 323px;
  }

  .spell-name-background {
    margin-left: 68px;
    margin-bottom: -47px;
  }

  .spell-limit-windows {
    margin-top: -2px;
  }
}
</style>
