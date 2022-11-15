<template>
  <v-card-text>
    <FormHeader title="card.edit.card" />
    <v-row class="fill-height">
      <v-col cols="12">
        <v-text-field
          v-model="name"
          :label="$t('card.edit.name')"
          :maxlength="maxNameLength"
        />
      </v-col>
      <v-col cols="12">
        <v-radio-group v-model="cardType" row :label="$t('card.edit.type')">
          <v-radio
            :label="$t('card.edit.fighter')"
            value="fighter"
            color="white"
          />
          <v-radio :label="$t('card.edit.favor')" value="favor" color="white" />
          <v-radio
            :label="$t('card.edit.challenge')"
            value="challenge"
            color="white"
          />
        </v-radio-group>
      </v-col>
      <v-col cols="12" v-if="isFighter" class="rarity">
        <v-radio-group
          v-model="fighterType"
          row
          :label="$t('card.edit.rarity')"
        >
          <v-radio
            :label="$t('card.edit.common')"
            value="common"
            color="white"
          />
          <v-radio :label="$t('card.edit.elite')" value="elite" color="amber" />
          <v-radio
            :label="$t('card.edit.minion')"
            value="minion"
            color="white"
          />
        </v-radio-group>
      </v-col>
      <v-col cols="5" v-if="isFighter">
        <v-switch
          v-model="isTwoSided"
          class="mb-1"
          :label="$t('card.edit.twoSided')"
        />
      </v-col>
      <v-col cols="7" v-if="isFighter">
        <v-fade-transition>
          <v-text-field
            v-if="isTwoSided"
            v-model="suffix"
            :label="$t('card.edit.suffix')"
            :maxlength="maxNameLength"
          />
        </v-fade-transition>
      </v-col>
      <v-col cols="4" v-if="isFighter">
        <v-text-field
          color="success"
          :label="$t('card.edit.mp')"
          append-icon="mdi-rhombus"
          maxlength="1"
          v-model="mp"
          @keydown="onKeyPress"
          @paste="onPaste"
        />
      </v-col>
      <v-col cols="4" v-if="isFighter">
        <v-text-field
          color="error"
          :label="$t('card.edit.hp')"
          append-icon="mdi-heart"
          maxlength="2"
          v-model="hp"
          @keydown="onHPKeyPress"
          @paste="onPaste"
        />
      </v-col>
      <v-col cols="4" v-if="isFighter">
        <v-text-field
          :label="$t('card.edit.ap')"
          append-icon="mdi-star"
          maxlength="1"
          v-model="ap"
          @keydown="onKeyPress"
          @paste="onPaste"
        />
      </v-col>
      <v-col cols="12" v-if="isFavor" class="rarity">
        <v-radio-group v-model="favorType" row :label="$t('card.edit.rarity')">
          <v-radio
            :label="$t('card.edit.regular')"
            value="regular"
            color="white"
          />
          <v-radio
            :label="$t('card.edit.superior')"
            value="superior"
            color="#a46ec3"
          />
          <v-radio
            :label="$t('card.edit.custom')"
            value="custom"
            color="#aaaaaa"
          />
        </v-radio-group>
      </v-col>
      <v-col cols="12" v-if="isFavor">
        <v-textarea
          v-model="favorEffect"
          :label="$t('card.edit.effect')"
          :rows="4"
          no-resize
          required
          persistent-hint
          :hint="$t('card.edit.ability.editHint')"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="version" :label="$t('card.edit.version')" />
      </v-col>
      <v-col cols="12">
        <v-textarea
          :label="$t('card.edit.comment')"
          v-model="comment"
          no-resize
          rows="4"
        />
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import AbstractForm from "~/components/cards/control/AbstractForm";
import {
  preventNonNumericInput,
  preventNonNumericPaste,
} from "~/assets/src/helpers";
import { CardType } from "~/store/card";
import { FavorType } from "~/store/favor";
import { FighterType } from "~/assets/src/data/fighters";

@Component
export default class BasicDataForm extends AbstractForm {
  get name(): string {
    const store = this.$store.state;
    switch (this.cardType) {
      case CardType.FIGHTER:
        return store.fighter.name;
      case CardType.FAVOR:
        return store.favor.name;
      case CardType.CHALLENGE:
        return store.challenge.name;
    }
  }

  set name(name: string) {
    this.setDirty();
    switch (this.cardType) {
      case CardType.FIGHTER:
        this.commitToAllFighterStores("setName", name);
        break;
      case CardType.FAVOR:
        this.$store.commit("favor/setName", name);
        break;
      case CardType.CHALLENGE:
        this.$store.commit("challenge/setName", name);
        break;
    }
  }

  get cardType(): CardType {
    // Even though available in the abstract component,
    // this getter is necessary since a setter is defined.
    return this.$store.state.card.type;
  }

  set cardType(type: CardType) {
    const previousType = this.cardType;
    this.setDirty();
    this.$store.commit("sidebar/reset");
    this.$store.commit("card/setType", type);
    if (type !== previousType && type !== CardType.FAVOR) {
      this.$store.commit("background/reset", type);
      this.updateCroppers();
    }
  }

  get comment(): string {
    return this.$store.state.card.comment;
  }

  set comment(comment: string) {
    this.setDirty();
    this.$store.commit("card/setComment", comment);
  }

  get version(): string {
    return this.$store.state.card.version;
  }

  set version(version: string) {
    this.setDirty();
    this.$store.commit("card/setVersion", version);
  }

  get maxNameLength(): number {
    switch (this.cardType) {
      case CardType.FIGHTER:
        return this.isMinion ? 20 : 30;
      case CardType.FAVOR:
        return 25;
      case CardType.CHALLENGE:
        return 30;
    }
  }

  get suffix(): string {
    return this.fighterState.suffix;
  }

  set suffix(suffix: string) {
    this.setDirty();
    this.commitToFighterStore("setSuffix", suffix);
  }

  get isTwoSided(): boolean {
    return this.fighterState.twoSided;
  }

  set isTwoSided(isTwoSided: boolean) {
    this.setDirty();
    this.commitToAllFighterStores("setTwoSided", isTwoSided);
    // Syncing common properties:
    if (isTwoSided) {
      const fighterState = this.$store.state.fighter;
      this.$store.commit("reverse/setName", fighterState.name);
      this.$store.commit("reverse/setType", fighterState.type);
    }
    this.updateCroppers();
  }

  get fighterType(): FighterType {
    return this.fighterState.type;
  }

  set fighterType(type: FighterType) {
    const previousType = this.fighterType;
    this.setDirty();
    this.commitToAllFighterStores("setType", type);

    // Updating default background on major fighter type change:
    if (type === FighterType.MINION && previousType !== FighterType.MINION) {
      this.$store.commit(
        "background/upload",
        require("~/assets/img/back/background-minion.png")
      );
      this.updateCroppers();
    } else if (
      type !== FighterType.MINION &&
      previousType === FighterType.MINION
    ) {
      this.$store.commit(
        "background/upload",
        require("~/assets/img/back/background.png")
      );
      this.updateCroppers();
    }
  }

  get mp(): string {
    return this.fighterState.mp;
  }

  set mp(mp: string) {
    this.setDirty();
    this.commitToFighterStore("setMP", mp);
  }

  get hp(): string {
    return this.fighterState.hp;
  }

  set hp(hp: string) {
    this.setDirty();
    this.commitToFighterStore("setHP", hp);
  }

  get ap(): string {
    return this.fighterState.ap;
  }

  set ap(ap: string) {
    this.setDirty();
    this.commitToFighterStore("setAP", ap);
  }

  get favorType(): FavorType {
    return this.$store.state.favor.type;
  }

  set favorType(favorType: FavorType) {
    this.setDirty();
    this.$store.commit("favor/setType", favorType);
  }

  get favorEffect(): string {
    return this.$store.state.favor.effect;
  }

  set favorEffect(favorEffect: string) {
    this.setDirty();
    this.$store.commit("favor/setEffect", favorEffect);
  }

  onKeyPress(event: KeyboardEvent) {
    preventNonNumericInput(event, true);
  }

  onHPKeyPress(event: KeyboardEvent) {
    const allowMinus = this.hp === "";
    const isFull = this.hp === "-";
    preventNonNumericInput(event, allowMinus, isFull);
  }

  onPaste(event: ClipboardEvent) {
    preventNonNumericPaste(event, true);
  }
}
</script>

<style lang="scss" scoped>
.rarity {
  margin-top: -45px;
}
</style>
