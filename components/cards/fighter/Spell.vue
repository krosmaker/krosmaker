<template>
  <div
    class="spell-container"
    ref="container"
    :class="{ 'minion-spell-container': isMinion }"
    @click="selectSpell(index)"
  >
    <div class="spell-content">
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
      <PlainInput
        class="spell-name"
        :class="{ 'spell-name-windows': isWindows }"
        :value="spell.name"
        @input="onNameChange($event, index)"
        :limit="40"
      />
      <div
        class="spell-description"
        :class="{
          'spell-description-extended': spell.damage.element === 'none',
          'spell-description-windows': isWindows,
        }"
        @click="openSpell(index)"
      >
        <Description :addOffset="true" :content="spell.description" />
        <Description
          v-if="reverseDescription"
          class="reverse-description"
          :class="{ 'secondary-description': spell.description }"
          :addOffset="!spell.description"
          :italic="true"
          :content="reverseDescription"
        />
      </div>
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
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";

import AbstractFighterComponent from "./AbstractFighterComponent";
import { Spell } from "~/assets/src/data/fighters";
import { TabId } from "~/store/sidebar";
import EventBus from "~/assets/src/events/bus";
import { FighterState } from "~/store/fighter";

@Component
export default class SpellContainer extends AbstractFighterComponent {
  @Prop({ type: Object, required: true })
  spell!: Spell;
  @Prop({ type: Number, required: true })
  index!: number;

  observer: ResizeObserver = new ResizeObserver(() => {
    EventBus.$emit("abilityResize");
  });

  get reverseState(): FighterState {
    return this.store === "fighter"
      ? this.$store.state.reverse
      : this.$store.state.fighter;
  }

  get requiresSpaceBeforeColon(): boolean {
    return this.$i18n.locale.startsWith("fr");
  }

  get reverseDescription(): string {
    if (this.fighterState.twoSided) {
      const reverse = this.reverseState;
      const reverseSpellVariant = reverse.spells.find(
        (reverseSpell) => reverseSpell.name === this.spell.name
      );
      if (
        reverseSpellVariant &&
        reverseSpellVariant.description &&
        reverseSpellVariant.description !== this.spell.description
      ) {
        const description = reverseSpellVariant.description;
        const suffix = reverse.suffix;
        const space = this.requiresSpaceBeforeColon ? " " : "";
        return suffix
          ? `*${this.capitalize(suffix)}${space}:* ${description}`
          : description;
      }
    }
    return "";
  }

  capitalize(text: string): string {
    return text.replace(/(\b[a-z](?!\s))/g, (letter) =>
      letter.toLocaleUpperCase()
    );
  }

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

  onNameChange(name: string, index: number) {
    this.setDirty();
    this.commitToFighterStore("setSpellName", { index, name });
  }

  onLimitChange(value: string, index: number) {
    const limit = parseInt(value);
    if (value && !isNaN(limit)) {
      this.setDirty();
      this.commitToFighterStore("setSpellLimit", { index, limit });
    }
  }

  onRangeFromChange(value: string, index: number) {
    const rangeFrom = parseInt(value);
    if (value && !isNaN(rangeFrom)) {
      const range = this.fighterState.spells[index].range.value;
      const rangeTo = Math.max(range[1], rangeFrom);
      this.setDirty();
      this.commitToFighterStore("setSpellRange", {
        index,
        range: [rangeFrom, rangeTo],
      });
    }
  }

  onRangeToChange(value: string, index: number) {
    const rangeTo = parseInt(value);
    if (value && !isNaN(rangeTo)) {
      const range = this.fighterState.spells[index].range.value;
      const rangeFrom = Math.min(range[0], rangeTo);
      this.setDirty();
      this.commitToFighterStore("setSpellRange", {
        index,
        range: [rangeFrom, rangeTo],
      });
    }
  }

  onDamageChange(value: string, index: number) {
    const damage = parseInt(value);
    if (value && !isNaN(damage)) {
      this.setDirty();
      this.commitToFighterStore("setSpellDamage", { index, damage });
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
  margin-bottom: -6px;

  .spell-range-background {
    position: absolute;
    top: 0px;
    left: 58px;
    border-radius: 10px;
    width: 100px;
    height: 100px;
  }

  .spell-range {
    font-family: "Helvetica Neue";
    position: absolute;
    top: 60px;
    left: 52px;
    font-size: 36px;
    font-weight: 700;
    display: inline;

    > input {
      color: white;
      display: inline-block;
      width: 18px;
      margin-left: 12px;
      margin-right: 12px;
    }
  }

  .spell-range-windows {
    margin-top: -6px;
  }

  .spell-limit {
    font-family: "Helvetica Neue";
    position: absolute;
    top: -3px;
    left: 832px;
    font-size: 44px;
    font-weight: bold;
    display: inline;

    input,
    span {
      display: inline-block;
      margin-left: -2px;
      margin-right: -4px;
    }
    input {
      color: white;
      width: 24px;
    }
    .spell-limit-turn {
      display: inline-block;
      vertical-align: middle;
      background-image: url("~assets/img/front/spells/limits/turn.png");
      width: 30px;
      height: 38px;
      margin-left: 2px;
      margin-bottom: 8px;
    }
    .spell-limit-target {
      display: inline-block;
      vertical-align: middle;
      background-image: url("~assets/img/front/spells/limits/target.png");
      width: 38px;
      height: 38px;
      margin-bottom: 6px;
      margin-left: -4px;
    }
  }

  .spell-limit-extended {
    left: 864px;
  }

  .spell-limit-windows {
    top: -9px;
  }

  .spell-damage-background {
    position: absolute;
    top: 36px;
    left: 896px;
  }

  $spell-damage-shadow: #222233;

  .spell-damage-value {
    font-family: "Helvetica Neue";
    position: absolute;
    color: white;
    top: 48px;
    left: 930px;
    width: 64px;
    font-size: 64px;
    font-weight: bold;
    overflow: visible;
    caret-color: transparent;
    filter: drop-shadow(-1px -1px 0px $spell-damage-shadow)
      drop-shadow(1px -1px 0px $spell-damage-shadow)
      drop-shadow(-1px 1px 0px $spell-damage-shadow)
      drop-shadow(1px 1px 0px $spell-damage-shadow)
      drop-shadow(0px 0px 1px $spell-damage-shadow)
      drop-shadow(0px 0px 2px $spell-damage-shadow);
  }

  .spell-damage-value-windows {
    margin-top: -10px;
  }

  .spell-content {
    position: relative;
    background: url("~assets/img/front/descriptions/background.png") bottom
      center no-repeat;
    padding-bottom: 36px;
    top: 5px;

    $spell-offset: 94px;

    .spell-name-background {
      position: absolute;
      left: 144px;
      top: -10px;
    }

    .spell-name {
      font-family: "Helvetica Neue";
      color: #eeeeee;
      text-shadow: 2.5px 2.5px #111111;
      position: absolute;
      left: 172px;
      top: -4px;
      width: 720px;
      font-weight: 700;
      font-size: 38px;
      white-space: nowrap;
      overflow: hidden;
    }

    .spell-description {
      cursor: pointer;
      font-family: "Helvetica Neue";
      color: #303030;
      font-size: 28px;
      line-height: 34px;
      margin-left: $spell-offset;
      margin-right: 146px;
      padding-top: 66px;
      font-weight: 400;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      min-height: 116px;
    }

    .reverse-description {
      opacity: 0.6;
    }
    .secondary-description::before {
      content: "\a";
      white-space: pre;
    }

    .spell-name-windows {
      top: -8px;
      letter-spacing: 0.75px;
    }
    .spell-description-windows {
      padding-top: 64px;
    }

    .spell-description-extended {
      margin-right: $spell-offset;
      min-height: 104px;
    }
  }
}

.minion-spell-container {
  .spell-content {
    width: $minion-card-width;
    background: url("~assets/img/front/descriptions/minion-background.png")
      bottom center no-repeat;
    padding-bottom: 18px;

    .spell-name {
      width: 560px;
      left: 154px;
      top: -2px;
    }

    .spell-name-background {
      left: 132px;
      top: -14px;
    }

    .spell-description {
      margin-left: 76px;
      margin-right: 152px;
      -webkit-line-clamp: 3;
      padding-top: 64px;
      min-height: 116px;
    }

    .spell-description-extended {
      margin-right: 76px;
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
    left: 41px;
  }

  .spell-range {
    left: 35px;
  }

  .spell-damage-background {
    top: 20px;
    left: 644px;
  }

  .spell-damage-value {
    top: 32px;
    left: 678px;
  }

  .spell-limit {
    left: 566px;
  }

  .spell-limit-extended {
    left: 646px;
    .spell-limit-windows {
      margin-top: -2px;
    }
  }
}
</style>
