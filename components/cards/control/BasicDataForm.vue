<template>
  <v-card-text>
    <h1>Krosmaster</h1>
    <v-row>
      <v-col cols="12" sm="12">
        <v-text-field
          v-model="content"
          label="Name"
          :maxlength="maxNameLength"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          color="success"
          label="MP"
          append-icon="mdi-rhombus"
          maxlength="1"
          v-model="mp"
          @keydown="onKeyPress($event, true)"
          @paste="onPaste($event, true)"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          color="error"
          label="HP"
          append-icon="mdi-heart"
          maxlength="2"
          v-model="hp"
          @keydown="onKeyPress($event, false)"
          @paste="onPaste($event, false)"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          label="AP"
          append-icon="mdi-star"
          maxlength="1"
          v-model="ap"
          @keydown="onKeyPress($event, true)"
          @paste="onPaste($event, true)"
        />
      </v-col>
      <v-col cols="12" sm="12">
        <v-radio-group v-model="type" row label="Rarity:">
          <v-radio label="Elite" value="elite" color="amber" />
          <v-radio label="Common" value="common" color="white" />
          <v-radio label="Minion" value="minion" color="white" />
        </v-radio-group>
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
import { KrosmasterType } from "~/store/krosmaster";

@Component
export default class KrosmasterName extends Vue {
  get content(): string {
    return this.$store.state.krosmaster.name;
  }

  set content(content: string) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("krosmaster/setName", content);
  }

  get maxNameLength(): number {
    return this.$store.state.krosmaster.type === "minion" ? 20 : 30;
  }

  get type(): KrosmasterType {
    return this.$store.state.krosmaster.type;
  }

  set type(type: KrosmasterType) {
    const previousType = this.type;
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
        require("~/assets/img/back/default-background.png")
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

  onKeyPress(event: KeyboardEvent, allowMinus: boolean) {
    preventNonNumericInput(event, allowMinus);
  }

  onPaste(event: ClipboardEvent, allowMinus: boolean) {
    preventNonNumericPaste(event, allowMinus);
  }
}
</script>

<style lang="scss" scoped>
h1 {
  padding: 0.6em;
  padding-bottom: 1em;
}
</style>
