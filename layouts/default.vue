<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title class="toolbar-title" v-text="'Krosmaker'" />
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
            The presented graphics from <strong>Krosmaster: Blast</strong> are
            copyrighted by <strong>Ankama</strong>. This website is not
            produced, endorsed, or affiliated with <strong>Ankama</strong>.
          </span>
        </v-card-actions>
        <v-divider />
        <v-card-actions class="justify-center">
          <span>&copy;2020 — <strong>MJ</strong></span>
        </v-card-actions>
      </v-card>
    </v-footer>
  </v-app>
</template>

<style scoped lang="scss">
.toolbar-title {
  font-family: "Berlin Sans";
}

.main-footer {
  padding: 0px;
}
</style>
