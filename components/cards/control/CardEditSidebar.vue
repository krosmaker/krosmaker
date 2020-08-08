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
      <v-tab @click="onTabClick(0, 'name')">
        <v-icon>mdi-account-edit</v-icon>
      </v-tab>
      <v-tab @click="onTabClick(1, 'artwork')">
        <v-icon>mdi-image-size-select-actual</v-icon>
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <NameForm />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <ArtworkForm />
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

  onTabClick(tab: TabId, tabName: string) {
    this.onTabChange(tab);
    if (this.expand) {
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
.v-navigation-drawer__content {
  overflow-y: hidden;
}
</style>

<style lang="scss" scoped>
.sidebar {
  background-color: #1e1e1e !important;
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
