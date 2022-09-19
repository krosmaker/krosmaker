<template>
  <v-card-text>
    <FormHeader title="card.edit.powers" />
    <v-expansion-panels class="pa-2 pt-4" accordion hover v-model="activePower">
      <v-expansion-panel v-for="(power, index) in powers" :key="index">
        <v-expansion-panel-header class="panel-header" ripple>
          {{ truncate(power.name, 21) || power.glyphs }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row class="pt-4">
            <v-col class="pa-0 pt-4" cols="12">
              <v-text-field
                :label="$t('card.edit.ability.name')"
                dense
                class="name-input"
                :value="power.name"
                @input="onNameChange($event, index)"
                maxlength="40"
                required
              />
            </v-col>
            <v-col class="pa-0" cols="12">
              <v-switch
                :input-value="power.isActive"
                @change="toggleType(index)"
                :label="
                  $t('card.edit.' + (power.isActive ? 'active' : 'passive'))
                "
                required
              />
            </v-col>
            <v-col class="pa-0 pb-6" cols="12">
              <v-textarea
                :label="$t('card.edit.ability.description')"
                :value="power.description"
                @input="onDescriptionChange($event, index)"
                :rows="4"
                no-resize
                required
                persistent-hint
                :hint="$t('card.edit.ability.editHint')"
              />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card-text>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { DivinePower } from "~/store/challenge";

@Component
export default class ChallengePowerForm extends Vue {
  showDeleteDialog: boolean = false;

  get activePower(): number | null {
    return this.$store.state.sidebar.activePower;
  }

  set activePower(activePower: number | null) {
    this.$store.commit("sidebar/setActivePower", activePower);
  }

  get powers(): DivinePower[] {
    return this.$store.state.challenge.powers;
  }

  truncate(text: string, length: number): string {
    return text.length > length ? text.substring(0, length) + "…" : text;
  }

  onNameChange(name: string, index: number) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("challenge/setPowerName", { index, name });
  }

  onDescriptionChange(description: string, index: number) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("challenge/setPowerDescription", {
      index,
      description,
    });
  }

  toggleType(index: number) {
    this.$store.commit("export/setDirty", true);
    const currentType = this.powers[index].isActive;
    this.$store.commit("challenge/setPowerType", {
      index,
      isActive: !currentType,
    });
  }
}
</script>

<style lang="scss" scoped>
.panel-header {
  > button {
    text-overflow: ellipsis;
  }
}
</style>
