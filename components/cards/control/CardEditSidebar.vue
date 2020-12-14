<template>
  <v-navigation-drawer
    class="sidebar"
    permanent
    clipped
    absolute
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
          <ArtworkForm />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat class="edit-tab-container">
          <SpellsForm />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat class="edit-tab-container">
          <PowersForm />
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
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { TabId } from "~/store/sidebar";

@Component
export default class CardEditSidebar extends Vue {
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

  onTabClick(tab: TabId, tabName: string | null = null) {
    this.onTabChange(tab);
    if (this.expand && tabName != null) {
      this.$emit(`${tabName}-select`);
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

<style lang="scss">
.sidebar {
  > div {
    overflow-y: hidden;
  }
}
</style>

<style lang="scss" scoped>
.sidebar {
  overflow-y: hidden;
  background-color: #1e1e1e !important;
}

.edit-tab-container {
  overflow: auto;
  max-height: calc(100vh - 150px);
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
