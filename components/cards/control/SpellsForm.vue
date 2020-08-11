<template>
  <v-card-text>
    <h1>Spells</h1>

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
            <v-col class="pa-0 pt-4" cols="12" sm="12">
              <v-text-field
                dense
                class="name-input"
                label="Name"
                :value="spell.name"
                @input="onNameChange($event, index)"
                maxlength="40"
                required
              />
            </v-col>
            <v-col class="pa-0 pt-1 pb-1" cols="12" sm="12">
              <v-textarea
                dense
                label="Description"
                :value="spell.description"
                @input="onDescriptionChange($event, index)"
                :rows="3"
                no-resize
                required
                persistent-hint
                hint="Keywords converted to icons: AP, MP, HP, Injury, Injuries, Air, Earth, Fire and Water. Surround text with * to bold."
              />
            </v-col>
            <v-col class="pa-0 pt-4 pr-2" ols="12" sm="6">
              <v-select
                dense
                :value="spell.range.type"
                @input="onRangeTypeChange($event, index)"
                :items="ranges"
                label="Range"
              ></v-select>
            </v-col>
            <v-col class="pa-0 pt-6 pl-2" cols="12" sm="6">
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
                  {{ spell.range.value[0] }}
                </template>
                <template v-slot:append>
                  {{ spell.range.value[1] }}
                </template>
              </v-range-slider>
            </v-col>
            <v-col class="pa-0 pt-1 pr-2" cols="12" sm="6">
              <v-select
                dense
                :value="spell.damage.element"
                @input="onElementChange($event, index)"
                :items="elements"
                label="Element"
                required
              ></v-select>
            </v-col>
            <v-col class="pa-0 pt-1 pl-2" cols="12" sm="6">
              <v-text-field
                dense
                :value="spell.damage.value"
                @input="onDamageChange($event, index)"
                label="Damage"
                type="number"
                min="0"
                max="9"
                :disabled="spell.damage.element === 'none'"
              />
            </v-col>
            <v-col class="pa-0 pt-1 pr-2" cols="12" sm="6">
              <v-select
                dense
                :value="spell.limit.type"
                @input="onLimitTypeChange($event, index)"
                :items="limits"
                label="Limit"
              ></v-select>
            </v-col>
            <v-col class="pa-0 pt-1 pl-2" cols="12" sm="6">
              <v-text-field
                dense
                :value="spell.limit.value"
                @input="onLimitChange($event, index)"
                label="Casts"
                type="number"
                min="1"
                max="9"
                :disabled="spell.limit.type === 'none'"
              />
            </v-col>
            <v-col class="pa-1" cols="12" sm="12">
              <v-card-actions>
                <v-btn
                  color="red darken-1"
                  text
                  @click="showDeleteDialog = true"
                >
                  <v-icon dark left>mdi-delete</v-icon>
                  Delete
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn text @click="moveUp(index)" :disabled="index === 0">
                  <v-icon dark left>mdi-chevron-up</v-icon>
                  Up
                </v-btn>

                <v-btn
                  text
                  @click="moveDown(index)"
                  :disabled="index === spells.length - 1"
                >
                  <v-icon dark left>mdi-chevron-down</v-icon>
                  Down
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
          Confirm deletion
        </v-card-title>

        <v-card-text>
          <span>Do you really want to delete </span>
          <strong>
            {{ activeSpell != null ? spells[activeSpell].name : "" }} </strong
          >?
          <span> Entered data will be lost.</span>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="showDeleteDialog = false">
            <v-icon dark left>mdi-cancel</v-icon>
            Cancel
          </v-btn>

          <v-btn color="red darken-1" text @click="deleteSpell">
            <v-icon dark left>mdi-delete</v-icon>
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card-text>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { Spell, Element, Range, Limit } from "~/store/krosmaster";
import { maxAbilitiesCount } from "~/assets/src/constants";

@Component
export default class SpellsForm extends Vue {
  showDeleteDialog: boolean = false;
  elements: Array<object> = [
    { value: Element.NONE, text: "None" },
    { divider: true },
    { value: Element.AIR, text: "Air" },
    { value: Element.EARTH, text: "Earth" },
    { value: Element.FIRE, text: "Fire" },
    { value: Element.WATER, text: "Water" },
  ];
  ranges: Array<object> = [
    { value: Range.REGULAR, text: "Regular" },
    { value: Range.SPECIAL, text: "Special" },
  ];
  limits: Array<object> = [
    { value: Limit.NONE, text: "None" },
    { divider: true },
    { value: Limit.TURN, text: "Per turn" },
    { value: Limit.TARGET, text: "Per target" },
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
    return (
      maxAbilitiesCount <= krosmaster.spells.length + krosmaster.powers.length
    );
  }

  truncate(text: string, length: number): string {
    return text.length > length ? text.substring(0, length) + "…" : text;
  }

  onNameChange(name: string, index: number) {
    this.$store.commit("krosmaster/setSpellName", { index, name });
  }

  onDescriptionChange(description: string, index: number) {
    this.$store.commit("krosmaster/setSpellDescription", {
      index,
      description,
    });
  }

  onElementChange(element: Element, index: number) {
    this.$store.commit("krosmaster/setSpellElement", {
      index,
      element,
    });
  }

  onDamageChange(damage: number, index: number) {
    this.$store.commit("krosmaster/setSpellDamage", {
      index,
      damage,
    });
  }

  onRangeTypeChange(range: Range, index: number) {
    this.$store.commit("krosmaster/setSpellRangeType", {
      index,
      range,
    });
  }

  onRangeChange(range: [number, number], index: number) {
    console.log("range changed", range);
    this.$store.commit("krosmaster/setSpellRange", {
      index,
      range,
    });
  }
  onLimitTypeChange(limit: Limit, index: number) {
    this.$store.commit("krosmaster/setSpellLimitType", {
      index,
      limit,
    });
  }
  onLimitChange(limit: number, index: number) {
    this.$store.commit("krosmaster/setSpellLimit", {
      index,
      limit,
    });
  }

  addSpell() {
    if (!this.isFull) {
      const spell: Spell = {
        name: "New spell",
        description: "Describe the spell here.",
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
      this.$store.commit("krosmaster/switchSpells", { from, to });
      this.activeSpell = to;
    }
  }

  private isValidIndex(index: number) {
    return 0 <= index && index < this.spells.length;
  }

  deleteSpell() {
    if (this.activeSpell != null) {
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
