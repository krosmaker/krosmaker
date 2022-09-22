<template>
  <v-navigation-drawer
    class="sidebar"
    permanent
    clipped
    :mini-variant="!expand"
    width="500"
    mini-variant-width="57"
  >
    <v-tabs class="tabs" v-model="activeTab" vertical>
      <v-tab @click="onTabClick(0, 'front')">
        <v-icon>mdi-dna</v-icon>
      </v-tab>
      <v-tab @click="onTabClick(1, 'front')">
        <v-icon>mdi-account-box</v-icon>
      </v-tab>
      <v-tab @click="onTabClick(2, 'back')">
        <v-icon>mdi-image-size-select-actual</v-icon>
      </v-tab>
      <v-tab @click="onTabClick(3, 'front')">
        <v-icon>mdi-auto-fix</v-icon>
      </v-tab>
      <v-tab @click="onTabClick(4, 'front')">
        <v-icon>mdi-arm-flex</v-icon>
      </v-tab>
      <v-tab @click="onTabClick(5)">
        <v-icon>mdi-fit-to-screen</v-icon>
      </v-tab>
      <v-tab id="exportTab" @click="onTabClick(6)">
        <v-icon>mdi-content-save</v-icon>
      </v-tab>
      <v-tab-item>
        <v-card flat class="edit-tab-container">
          <BasicDataForm />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat class="edit-tab-container">
          <FigurineForm />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat class="edit-tab-container">
          <ReverseFigurineForm v-show="isFighter && isTwoSided" />
          <ArtworkForm v-show="!isFighter || (isFighter && !isTwoSided)" />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat class="edit-tab-container">
          <SpellsForm />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat class="edit-tab-container">
          <ChallengePowerForm v-if="isChallenge" />
          <PowersForm v-else />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat class="edit-tab-container">
          <DisplayForm />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat class="edit-tab-container">
          <ExportForm />
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import AbstractForm from "~/components/cards/control/AbstractForm";
import { CardType } from "~/store/card";
import { TabId } from "~/store/sidebar";

@Component
export default class CardEditSidebar extends AbstractForm {
  get activeTab(): TabId {
    return this.$store.state.sidebar.activeTab;
  }

  set activeTab(tab: TabId) {
    this.$store.commit("sidebar/setActiveTab", tab);
  }

  get expand(): boolean {
    return this.$store.state.sidebar.expand;
  }

  set expand(expand: boolean) {
    this.$store.commit("sidebar/setExpand", expand);
  }

  get availableEditors(): TabId[] {
    switch (this.cardType) {
      case CardType.FAVOR:
        return [TabId.NAME, TabId.DISPLAY, TabId.EXPORT];
      case CardType.CHALLENGE:
        return [
          TabId.NAME,
          TabId.ARTWORK,
          TabId.POWERS,
          TabId.DISPLAY,
          TabId.EXPORT,
        ];
      case CardType.FIGHTER:
        return this.isTwoSided
          ? // Disabling automatic flipping on tabs
            // that can be edited separately for each side:
            [TabId.ARTWORK, TabId.FIGURINE]
          : // Otherwise all tabs are active:
            [
              TabId.NAME,
              TabId.FIGURINE,
              TabId.ARTWORK,
              TabId.SPELLS,
              TabId.POWERS,
              TabId.DISPLAY,
              TabId.EXPORT,
            ];
    }
  }

  onTabClick(tab: TabId, tabName: string | null = null) {
    this.onTabChange(tab);
    if (this.expand && tabName != null && this.availableEditors.includes(tab)) {
      this.isFlipped = tabName === "back";
    }
  }

  onTabChange(tab: TabId) {
    if (!this.expand) {
      this.expand = true;
    } else if (this.activeTab === tab) {
      this.expand = !this.expand;
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 64px !important;
  left: 0px !important;
  max-height: calc(100vh - 64px);
  overflow-y: hidden;
  background-color: #1e1e1e !important;
}

.edit-tab-container {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 100px);
}

.tabs {
  overflow: hidden;
  width: 480px;
}

.v-tab {
  min-width: initial;
}

.sidebar-content {
  padding-top: 1em;
  padding-left: 1.5em;
}
</style>
