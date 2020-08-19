<template>
  <fragment>
    <div
      v-for="(spell, index) in spells"
      :key="index"
      class="spell-container"
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
      <div class="spell-range" v-if="spell.range.type === 'regular'">
        <PlainInput
          numeric
          :limit="1"
          :value="`${spell.range.value[0]}`"
          @input="onRangeFromChange($event, index)"
        />
        <span>-</span>
        <PlainInput
          numeric
          :limit="1"
          :value="`${spell.range.value[1]}`"
          @input="onRangeToChange($event, index)"
        />
      </div>

      <div
        class="spell-limit"
        :class="{ 'spell-limit-extended': spell.damage.element === 'none' }"
        v-if="spell.limit.type !== 'none'"
      >
        <PlainInput
          numeric
          :limit="1"
          :value="`${spell.limit.value}`"
          @input="onLimitChange($event, index)"
        />
        <span>/</span>
        <span
          class="spell-limit-turn"
          v-if="spell.limit.type === 'turn'"
        ></span>
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
        class="spell-damage-value"
        v-if="spell.damage.element !== 'none'"
        numeric
        :limit="1"
        :value="`${spell.damage.value}`"
        @input="onDamageChange($event, index)"
      />

      <img
        class="spell-name-background"
        src="~/assets/img/front/spells/header.png"
      />
      <div class="spell-content">
        <PlainInput
          class="spell-name"
          :value="spell.name"
          @input="onNameChange($event, index)"
          :limit="40"
        />
        <Description
          class="spell-description"
          :class="{
            'spell-description-extended': spell.damage.element === 'none',
          }"
          :content="spell.description"
          @click.native="openSpell(index)"
        />
      </div>
    </div>
  </fragment>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { Component } from "vue-property-decorator";

import { Spell } from "~/assets/src/data/fighters";
import { maxAbilitiesCount } from "~/assets/src/constants";
import { TabId } from "~/store/sidebar";

@Component
export default class SpellsForm extends Vue {
  get spells(): Spell[] {
    return this.$store.state.krosmaster.spells;
  }

  onNameChange(name: string, index: number) {
    this.$store.commit("krosmaster/setSpellName", { index, name });
  }

  onLimitChange(value: string, index: number) {
    const limit = parseInt(value);
    if (value && !isNaN(limit)) {
      this.$store.commit("krosmaster/setSpellLimit", { index, limit });
    }
  }

  onRangeFromChange(value: string, index: number) {
    const rangeFrom = parseInt(value);
    if (value && !isNaN(rangeFrom)) {
      const range = this.$store.state.krosmaster.spells[index].range.value;
      const rangeTo = Math.max(range[1], rangeFrom);
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
      this.$store.commit("krosmaster/setSpellRange", {
        index,
        range: [rangeFrom, rangeTo],
      });
    }
  }

  onDamageChange(value: string, index: number) {
    const damage = parseInt(value);
    if (value && !isNaN(damage)) {
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
  margin-bottom: -3.75%;

  .spell-range-background {
    position: absolute;
    top: 24px;
    left: 5.5%;
    border-radius: 5px;
    width: 50px;
    height: 50px;
  }

  .spell-range {
    font-family: "Helvetica Neue";
    position: absolute;
    top: 54px;
    left: 4.9%;
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

  .spell-limit {
    font-family: "Helvetica Neue";
    position: absolute;
    top: 24px;
    left: 80%;
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
    left: 83%;
  }

  .spell-damage-background {
    position: absolute;
    top: 42px;
    left: 86%;
  }

  $spell-damage-shadow: #222233;

  .spell-damage-value {
    font-family: "Helvetica Neue";
    position: absolute;
    color: white;
    top: 48px;
    left: 89.3%;
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

  .spell-name-background {
    margin-left: 14%;
    margin-bottom: -7%;
  }

  .spell-content {
    background: url("~assets/img/front/descriptions/background.png") bottom
      center no-repeat;
    padding-bottom: 8px;

    .spell-name {
      font-family: "Helvetica Neue";
      color: #eeeeee;
      text-shadow: 2px 2px #111111;
      margin-left: 16.5%;
      margin-top: 1px;
      margin-bottom: -1%;
      width: $card-width * 0.7;
      font-weight: 700;
      font-size: 19px;
      white-space: nowrap;
      overflow: hidden;
    }

    .spell-description {
      cursor: pointer;
      font-family: "Helvetica Neue";
      color: #303030;
      font-size: 15px;
      line-height: 17px;
      margin-left: 16.5%;
      margin-right: 14%;
      min-height: 37px;
      padding-top: 1%;
      font-weight: 400;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .spell-description-extended {
      margin-right: 9%;
    }
  }
}
</style>
