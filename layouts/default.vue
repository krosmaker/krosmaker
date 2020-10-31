<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title class="toolbar-title" v-text="'Krosmaker'" />
      <v-spacer></v-spacer>
      <v-btn icon href="https://twitter.com/krosmaker">
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn icon href="https://github.com/czyzby/krosmaker/issues">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fill-height fill-width fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer class="main-footer" dark height="auto">
      <v-card class="flex" flat tile>
        <v-divider />
        <v-card-actions class="justify-center">
          <span class="font-weight-light caption">
            The graphics from <strong>Krosmaster: Blast</strong> are copyrighted
            by <strong>Ankama</strong> and published with their permission. This
            website is not produced or affiliated with <strong>Ankama</strong>.
          </span>
        </v-card-actions>
        <v-divider />
        <v-card-actions class="justify-center">
          <span>&copy;2020 — <strong>MJ</strong></span>
        </v-card-actions>
        <div class="version">{{ version }}-{{ hash }}</div>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class DefaultLayout extends Vue {
  get version(): string {
    return process.env.version || "";
  }

  get hash(): string {
    return process.env.gitHash || "";
  }
}
</script>

<style scoped lang="scss">
.toolbar-title {
  font-family: "Berlin Sans";
}

.main-footer {
  padding: 0px;
}

.version {
  color: #777;
  width: 100%;
  font-size: 10px;
  text-align: right;
  margin-top: -14px;
  padding-right: 4px;
}
</style>
