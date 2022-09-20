<template>
  <v-card-text>
    <FormHeader title="card.edit.powers" />
    <FighterOnlyForm>
      <v-expansion-panels
        class="pa-2 pt-4"
        accordion
        hover
        active-class="selected-power"
        v-model="activePower"
      >
        <v-expansion-panel v-for="(power, index) in powers" :key="index">
          <v-expansion-panel-header class="panel-header" ripple>
            {{ truncate(power.name, 21) }}
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
              <v-col class="pa-1" cols="12">
                <v-card-actions>
                  <v-btn
                    color="red darken-1"
                    icon
                    large
                    @click="showDeleteDialog = true"
                  >
                    <v-icon dark>mdi-delete</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>

                  <v-btn text @click="moveUp(index)" :disabled="index === 0">
                    <v-icon dark left>mdi-chevron-up</v-icon>
                    {{ $t("common.up") }}
                  </v-btn>

                  <v-btn
                    text
                    @click="moveDown(index)"
                    :disabled="index === powers.length - 1"
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

      <v-fade-transition>
        <v-card class="d-flex justify-center pa-3" v-if="!isFull" flat>
          <v-btn fab dark color="primary" @click="addPower">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </v-card>
      </v-fade-transition>

      <v-dialog v-model="showDeleteDialog" max-width="400">
        <v-card>
          <v-card-title class="headline">
            {{ $t("card.edit.ability.deletionHeader") }}
          </v-card-title>

          <v-card-text>
            <span
              >{{
                $t("card.edit.ability.deletionPrompt", {
                  item: activePower != null ? powers[activePower].name : "",
                })
              }}
            </span>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text @click="showDeleteDialog = false">
              <v-icon dark left>mdi-cancel</v-icon>
              {{ $t("common.cancel") }}
            </v-btn>

            <v-btn color="red darken-1" text @click="deletePower">
              <v-icon dark left>mdi-delete</v-icon>
              {{ $t("common.delete") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </FighterOnlyForm>
  </v-card-text>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import AbstractForm from "~/components/cards/control/AbstractForm";
import { Power } from "~/assets/src/data/fighters";
import {
  maxAbilitiesCount,
  maxMinionAbilitiesCount,
} from "~/assets/src/constants";

@Component
export default class PowersForm extends AbstractForm {
  showDeleteDialog: boolean = false;

  get activePower(): number | null {
    return this.$store.state.sidebar.activePower;
  }

  set activePower(activePower: number | null) {
    this.$store.commit("sidebar/setActivePower", activePower);
  }

  get powers(): Power[] {
    return this.fighterState.powers;
  }

  get isFull(): boolean {
    const fighter = this.fighterState;
    const totalAbilities = fighter.powers.length + fighter.spells.length;
    const maxAbilities = this.isMinion
      ? maxMinionAbilitiesCount
      : maxAbilitiesCount;
    return totalAbilities >= maxAbilities;
  }

  onNameChange(name: string, index: number) {
    this.setDirty();
    this.commitToFighterStore("setPowerName", { index, name });
  }

  onDescriptionChange(description: string, index: number) {
    this.setDirty();
    this.commitToFighterStore("setPowerDescription", {
      index,
      description,
    });
  }

  addPower() {
    if (!this.isFull) {
      this.setDirty();
      this.commitToFighterStore("addPower", {
        name: this.$i18n.t("card.edit.ability.newPowerName").toString(),
        description: this.$i18n
          .t("card.edit.ability.newPowerDescription")
          .toString(),
      });
      this.activePower = this.powers.length - 1;
    }
  }

  moveUp(index: number) {
    this.movePower(index, index - 1);
  }

  moveDown(index: number) {
    this.movePower(index, index + 1);
  }

  private movePower(from: number, to: number) {
    if (this.isValidIndex(from) && this.isValidIndex(to)) {
      this.setDirty();
      this.commitToFighterStore("switchPowers", { from, to });
      this.activePower = to;
    }
  }

  private isValidIndex(index: number) {
    return 0 <= index && index < this.powers.length;
  }

  deletePower() {
    const powerId = this.activePower;
    if (powerId != null) {
      const name = this.powers[powerId].name;
      this.setDirty();
      this.commitToFighterStore("removePower", powerId);
      this.activePower = null;
      this.$store.commit("notification/add", {
        message: "card.edit.notification.delete",
        parameters: { name },
        color: "error",
      });
    }
    this.showDeleteDialog = false;
  }
}
</script>

<style lang="scss" scoped>
.panel-header {
  > button {
    text-overflow: ellipsis;
  }
}

.selected-power {
  > button {
    background-color: #ffffff11;
  }
}
</style>
