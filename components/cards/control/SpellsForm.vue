<template>
  <v-card-text>
    <h1>{{ $t("card.edit.spells") }}</h1>

    <v-expansion-panels
      class="pa-2 pt-4"
      accordion
      hover
      active-class="selected-spell"
      v-model="activeSpell"
    >
      <v-expansion-panel v-for="(spell, index) in spells" :key="index">
        <v-expansion-panel-header class="panel-header" ripple>
          {{ truncate(spell.name, 21) }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col class="pa-0 pt-4" cols="12">
              <v-text-field
                dense
                class="name-input"
                :label="$t('card.edit.ability.name')"
                :value="spell.name"
                @input="onNameChange($event, index)"
                maxlength="40"
                required
              />
            </v-col>
            <v-col class="pa-0 pt-1 pb-1" cols="12">
              <v-textarea
                dense
                :label="$t('card.edit.ability.description')"
                :value="spell.description"
                @input="onDescriptionChange($event, index)"
                :rows="3"
                no-resize
                required
                persistent-hint
                :hint="$t('card.edit.ability.editHint')"
              />
            </v-col>
            <v-col class="pa-0 pt-4 pr-2" cols="6">
              <v-select
                dense
                :value="spell.range.type"
                @input="onRangeTypeChange($event, index)"
                :items="ranges"
                :label="$t('card.edit.ability.range')"
              ></v-select>
            </v-col>
            <v-col class="pa-0 pt-6 pl-2" cols="6">
              <v-range-slider
                class="range-slider"
                :value="spell.range.value"
                @input="onRangeChange($event, index)"
                :disabled="spell.range.type === 'special'"
                min="0"
                max="9"
                hide-details
              >
                <template v-slot:prepend>
                  <span class="slider-label">{{ spell.range.value[0] }}</span>
                </template>
                <template v-slot:append>
                  <span class="slider-label">{{ spell.range.value[1] }}</span>
                </template>
              </v-range-slider>
            </v-col>
            <v-col class="pa-0 pt-1 pr-2" cols="6">
              <v-select
                dense
                :value="spell.damage.element"
                @input="onElementChange($event, index)"
                :items="elements"
                :label="$t('card.edit.ability.damage')"
                required
              ></v-select>
            </v-col>
            <v-col class="pa-0 pt-1 pl-2" cols="6">
              <v-slider
                dense
                :value="spell.damage.value"
                @input="onDamageChange($event, index)"
                min="0"
                max="9"
                hide-details
                :disabled="spell.damage.element === 'none'"
              >
                <template v-slot:prepend>
                  <span class="slider-label">{{ spell.damage.value }}</span>
                </template>
              </v-slider>
            </v-col>
            <v-col class="pa-0 pt-1 pr-2" cols="6">
              <v-select
                dense
                :value="spell.limit.type"
                @input="onLimitTypeChange($event, index)"
                :items="limits"
                :label="$t('card.edit.ability.limit')"
              ></v-select>
            </v-col>
            <v-col class="pa-0 pt-1 pl-2" cols="6">
              <v-slider
                dense
                :value="spell.limit.value"
                @input="onLimitChange($event, index)"
                min="1"
                max="9"
                hide-details
                :disabled="spell.limit.type === 'none'"
              >
                <template v-slot:prepend>
                  <span class="slider-label">{{ spell.limit.value }}</span>
                </template>
              </v-slider>
            </v-col>
            <v-col class="pa-1" cols="12">
              <v-card-actions>
                <v-btn
                  color="red darken-1"
                  text
                  @click="showDeleteDialog = true"
                >
                  <v-icon dark left>mdi-delete</v-icon>
                  {{ $t("common.delete") }}
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn text @click="moveUp(index)" :disabled="index === 0">
                  <v-icon dark left>mdi-chevron-up</v-icon>
                  {{ $t("common.up") }}
                </v-btn>

                <v-btn
                  text
                  @click="moveDown(index)"
                  :disabled="index === spells.length - 1"
                >
                  <v-icon dark left>mdi-chevron-down</v-icon>
                  {{ $t("common.down") }}
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <transition name="fade">
      <v-card class="d-flex justify-center pa-3" v-if="!isFull" flat>
        <v-btn fab dark color="primary" @click="addSpell">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-card>
    </transition>

    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">
          {{ $t("card.edit.ability.deletionHeader") }}
        </v-card-title>

        <v-card-text>
          <span>{{ $t("card.edit.ability.deletionPrompt1") }} </span>
          <strong>{{
            activeSpell != null ? spells[activeSpell].name : ""
          }}</strong
          >?
          <span> {{ $t("card.edit.ability.deletionPrompt2") }}</span>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="showDeleteDialog = false">
            <v-icon dark left>mdi-cancel</v-icon>
            {{ $t("common.cancel") }}
          </v-btn>

          <v-btn color="red darken-1" text @click="deleteSpell">
            <v-icon dark left>mdi-delete</v-icon>
            {{ $t("common.delete") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card-text>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { Spell, Element, Range, Limit } from "~/assets/src/data/fighters";
import {
  maxAbilitiesCount,
  maxMinionAbilitiesCount,
} from "~/assets/src/constants";

@Component
export default class SpellsForm extends Vue {
  showDeleteDialog: boolean = false;
  elements: Array<object> = [
    {
      value: Element.NONE,
      text: this.$i18n.t("card.edit.ability.element.none"),
    },
    { divider: true },
    { value: Element.AIR, text: this.$i18n.t("card.edit.ability.element.air") },
    {
      value: Element.EARTH,
      text: this.$i18n.t("card.edit.ability.element.earth"),
    },
    {
      value: Element.FIRE,
      text: this.$i18n.t("card.edit.ability.element.fire"),
    },
    {
      value: Element.WATER,
      text: this.$i18n.t("card.edit.ability.element.water"),
    },
  ];
  ranges: Array<object> = [
    { value: Range.REGULAR, text: this.$i18n.t("card.edit.ability.regular") },
    { value: Range.SPECIAL, text: this.$i18n.t("card.edit.ability.special") },
  ];
  limits: Array<object> = [
    { value: Limit.NONE, text: this.$i18n.t("card.edit.ability.none") },
    { divider: true },
    { value: Limit.TURN, text: this.$i18n.t("card.edit.ability.perTurn") },
    { value: Limit.TARGET, text: this.$i18n.t("card.edit.ability.perTarget") },
  ];

  get activeSpell(): number | null {
    return this.$store.state.sidebar.activeSpell;
  }

  set activeSpell(activeSpell: number | null) {
    this.$store.commit("sidebar/setActiveSpell", activeSpell);
  }

  get spells(): Spell[] {
    return this.$store.state.krosmaster.spells;
  }

  get isFull(): boolean {
    const krosmaster = this.$store.state.krosmaster;
    const totalAbilities = krosmaster.powers.length + krosmaster.spells.length;
    const maxAbilities =
      krosmaster.type === "minion"
        ? maxMinionAbilitiesCount
        : maxAbilitiesCount;
    return totalAbilities >= maxAbilities;
  }

  truncate(text: string, length: number): string {
    return text.length > length ? text.substring(0, length) + "…" : text;
  }

  onNameChange(name: string, index: number) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("krosmaster/setSpellName", { index, name });
  }

  onDescriptionChange(description: string, index: number) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("krosmaster/setSpellDescription", {
      index,
      description,
    });
  }

  onElementChange(element: Element, index: number) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("krosmaster/setSpellElement", {
      index,
      element,
    });
  }

  onDamageChange(damage: number, index: number) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("krosmaster/setSpellDamage", {
      index,
      damage,
    });
  }

  onRangeTypeChange(range: Range, index: number) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("krosmaster/setSpellRangeType", {
      index,
      range,
    });
  }

  onRangeChange(range: [number, number], index: number) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("krosmaster/setSpellRange", {
      index,
      range,
    });
  }
  onLimitTypeChange(limit: Limit, index: number) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("krosmaster/setSpellLimitType", {
      index,
      limit,
    });
  }
  onLimitChange(limit: number, index: number) {
    this.$store.commit("export/setDirty", true);
    this.$store.commit("krosmaster/setSpellLimit", {
      index,
      limit,
    });
  }

  addSpell() {
    if (!this.isFull) {
      const spell: Spell = {
        name: this.$i18n.t("card.edit.ability.newSpellName").toString(),
        description: this.$i18n
          .t("card.edit.ability.newSpellDescription")
          .toString(),
        damage: {
          element: Element.NONE,
          value: 1,
        },
        range: {
          type: Range.REGULAR,
          value: [1, 1],
        },
        limit: {
          type: Limit.NONE,
          value: 1,
        },
      };
      this.$store.commit("export/setDirty", true);
      this.$store.commit("krosmaster/addSpell", spell);
      this.activeSpell = this.spells.length - 1;
    }
  }

  moveUp(index: number) {
    this.moveSpell(index, index - 1);
  }

  moveDown(index: number) {
    this.moveSpell(index, index + 1);
  }

  private moveSpell(from: number, to: number) {
    if (this.isValidIndex(from) && this.isValidIndex(to)) {
      this.$store.commit("export/setDirty", true);
      this.$store.commit("krosmaster/switchSpells", { from, to });
      this.activeSpell = to;
    }
  }

  private isValidIndex(index: number) {
    return 0 <= index && index < this.spells.length;
  }

  deleteSpell() {
    if (this.activeSpell != null) {
      this.$store.commit("export/setDirty", true);
      this.$store.commit("krosmaster/removeSpell", this.activeSpell);
      this.activeSpell = null;
    }
    this.showDeleteDialog = false;
  }
}
</script>

<style lang="scss" scoped>
h1 {
  padding: 0.6em;
  padding-bottom: 1em;
}

.range-slider {
  margin-top: -8px;
}

.slider-label {
  margin-top: 5px;
}

.panel-header {
  > button {
    text-overflow: ellipsis;
  }
}

.selected-spell {
  > button {
    background-color: #ffffff11;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
