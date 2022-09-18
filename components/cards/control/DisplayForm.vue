<template>
  <v-card-text>
    <FormHeader title="card.edit.display" />
    <v-row justify="center">
      <v-col cols="8" offset="2" class="align-center justify-center">
        <v-tabs v-model="tab">
          <v-tab :key="0">{{ $t("card.edit.play") }}</v-tab>
          <v-tab :key="1">{{ $t("card.edit.print") }}</v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12">
        <v-tabs-items v-model="tab">
          <v-tab-item :key="0">
            <v-row>
              <v-col cols="6" offset="3" class="mt-7">
                <v-select
                  :items="scales"
                  :label="$t('card.edit.scale')"
                  v-model="scale"
                  filled
                ></v-select>
              </v-col>
              <v-col cols="12" class="d-flex flex-column align-center">
                <v-btn-toggle v-model="rounded">
                  <v-btn text>
                    <v-icon dark left>mdi-rounded-corner</v-icon>
                    {{ $t("card.edit.roundedCorners") }}
                  </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item :key="1">
            <v-row class="ma-4 mt-6">
              <v-col cols="12" class="mb-8">
                <h3>{{ $t("card.edit.targetCardSize") }}</h3>
              </v-col>
              <v-col cols="6">
                <v-slider
                  v-if="isRegularSize"
                  :label="$t('card.edit.width')"
                  thumb-label="always"
                  min="1030"
                  max="1050"
                  step="1"
                  v-model="width"
                />
                <v-slider
                  v-else
                  :label="$t('card.edit.width')"
                  thumb-label="always"
                  min="780"
                  max="800"
                  step="1"
                  v-model="width"
                />
              </v-col>
              <v-col cols="6">
                <v-slider
                  v-if="isRegularSize"
                  :label="$t('card.edit.height')"
                  thumb-label="always"
                  min="730"
                  max="750"
                  step="1"
                  v-model="height"
                />
                <v-slider
                  v-else
                  :label="$t('card.edit.height')"
                  thumb-label="always"
                  min="510"
                  max="530"
                  step="1"
                  v-model="height"
                />
              </v-col>
              <v-col cols="12">
                <v-slider
                  :label="$t('card.edit.offset')"
                  thumb-label="always"
                  min="0"
                  max="50"
                  step="1"
                  v-model="offset"
                />
              </v-col>
              <v-col cols="4" offset="8">
                <strong
                  >{{ width + offset * 2 }}✕{{ height + offset * 2 }} px</strong
                >
              </v-col>
              <v-col cols="12" class="mb-6">
                <v-fade-transition>
                  <v-alert v-if="isInvalidSize" dense outlined type="error">
                    {{ $t("card.edit.invalidSizeWarning") }}
                  </v-alert>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { DisplayState, Scale } from "~/store/display";
import { CardType } from "~/store/card";

@Component
export default class DisplayForm extends Vue {
  scales: Array<object> = [
    {
      value: Scale.LARGE,
      text: "100%",
    },
    {
      value: Scale.MEDIUM,
      text: "75%",
    },
    {
      value: Scale.SMALL,
      text: "50%",
    },
  ];

  get tab(): number {
    return this.$store.state.display.mode;
  }

  set tab(tab: number) {
    this.$store.commit("display/setMode", tab);
  }

  get isRegularSize(): boolean {
    return (
      this.$store.state.card.type === CardType.FIGHTER &&
      this.$store.state.krosmaster.type !== "minion"
    );
  }

  get isInvalidSize(): boolean {
    return !this.$store.state.display.isValid;
  }

  get rounded(): number | undefined {
    const isRounded = this.$store.state.display.roundedCorners;
    return isRounded ? 0 : undefined;
  }

  set rounded(rounded: number | undefined) {
    const isRounded = rounded === 0;
    this.$store.commit("display/setRoundedCorners", isRounded);
  }

  get scale(): Scale {
    return this.$store.state.display.scale;
  }

  set scale(scale: Scale) {
    this.$store.commit("display/setScale", scale);
  }

  get width(): number {
    const display: DisplayState = this.$store.state.display;
    return this.isRegularSize
      ? display.targetKrosmasterWidth
      : display.targetMinionWidth;
  }

  set width(width: number) {
    const mutation = this.isRegularSize
      ? "setTargetKrosmasterWidth"
      : "setTargetMinionWidth";
    this.$store.commit(`display/${mutation}`, width);
  }

  get height(): number {
    const display: DisplayState = this.$store.state.display;
    return this.isRegularSize
      ? display.targetKrosmasterHeight
      : display.targetMinionHeight;
  }

  set height(height: number) {
    const mutation = this.isRegularSize
      ? "setTargetKrosmasterHeight"
      : "setTargetMinionHeight";
    this.$store.commit(`display/${mutation}`, height);
  }

  get minHeight(): number {
    return this.isRegularSize ? 730 : 505;
  }

  get maxHeight(): number {
    return this.isRegularSize ? 750 : 525;
  }

  get offset(): number {
    return this.$store.state.display.bleedingOffset;
  }

  set offset(offset: number) {
    this.$store.commit("display/setBleedingOffset", offset);
  }
}
</script>
