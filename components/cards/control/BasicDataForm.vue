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
import Vue from "vue";
import { Component } from "vue-property-decorator";
import EventBus from "~/assets/src/events/bus";

import {
  preventNonNumericInput,
  preventNonNumericPaste,
} from "~/assets/src/helpers";
import { CardType } from "~/store/card";
import { FavorType } from "~/store/favor";
import { KrosmasterType } from "~/store/krosmaster";

@Component
export default class BasicDataForm extends Vue {
  get cardType(): CardType {
    return this.$store.state.card.type;
  }

  get name(): string {
    const store = this.$store.state;
    switch (this.cardType) {
      case CardType.FIGHTER:
        return store.krosmaster.name;
      case CardType.FAVOR:
        return store.favor.name;
      case CardType.CHALLENGE:
        return store.challenge.name;
    }
  }

  set name(name: string) {
    this.$store.commit("export/setDirty", true);
    switch (this.cardType) {
      case CardType.FIGHTER:
        this.$store.commit("krosmaster/setName", name);
        break;
      case CardType.FAVOR:
        this.$store.commit("favor/setName", name);
        break;
      case CardType.CHALLENGE:
        this.$store.commit("challenge/setName", name);
        break;
    }
  }

  set cardType(type: CardType) {
    const previousType = this.cardType;
    this.$store.commit("export/setDirty", true);
    this.$store.commit("sidebar/reset");
    this.$store.commit("card/setType", type);
    if (type !== previousType && type !== CardType.FAVOR) {
      this.$store.commit("background/reset", type);
      // Updating cropper:
      EventBus.$emit("card-load");
    }
  }

  get isFighter(): boolean {
    return this.cardType === CardType.FIGHTER;
  }

  get isFavor(): boolean {
    return this.cardType === CardType.FAVOR;
  }

  get comment(): string {
    return this.$store.state.card.comment;
  }

  set comment(comment: string) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("card/setComment", comment);
  }

  get version(): string {
    return this.$store.state.card.version;
  }

  set version(version: string) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("card/setVersion", version);
  }

  get maxNameLength(): number {
    switch (this.cardType) {
      case CardType.FIGHTER:
        return this.$store.state.krosmaster.type === "minion" ? 20 : 30;
      case CardType.FAVOR:
        return 25;
      case CardType.CHALLENGE:
        return 30;
    }
  }

  get fighterType(): KrosmasterType {
    return this.$store.state.krosmaster.type;
  }

  set fighterType(type: KrosmasterType) {
    const previousType = this.fighterType;
    this.$store.commit("export/setDirty", true);
    this.$store.commit("krosmaster/setType", type);

    // Updating default background on major fighter type change:
    if (type === "minion" && previousType !== "minion") {
      this.$store.commit(
        "background/upload",
        require("~/assets/img/back/background-minion.png")
      );
      // Updating croppers:
      EventBus.$emit("card-load");
    } else if (type !== "minion" && previousType === "minion") {
      this.$store.commit(
        "background/upload",
        require("~/assets/img/back/background.png")
      );
      // Updating croppers:
      EventBus.$emit("card-load");
    }
  }

  get mp(): string {
    return this.$store.state.krosmaster.mp;
  }

  set mp(mp: string) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("krosmaster/setMP", mp);
  }

  get hp(): string {
    return this.$store.state.krosmaster.hp;
  }

  set hp(hp: string) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("krosmaster/setHP", hp);
  }

  get ap(): string {
    return this.$store.state.krosmaster.ap;
  }

  set ap(ap: string) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("krosmaster/setAP", ap);
  }

  get favorType(): FavorType {
    return this.$store.state.favor.type;
  }

  set favorType(favorType: FavorType) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("favor/setType", favorType);
  }

  get favorEffect(): string {
    return this.$store.state.favor.effect;
  }

  set favorEffect(favorEffect: string) {
    this.$store.commit("export/setDirty", true);
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
