<template>
  <v-card-text>
    <h1>Krosmaster</h1>
    <v-text-field v-model="content" label="Name" maxlength="30" />
    <v-radio-group v-model="isElite" row>
      <v-radio label="Elite" :value="true"></v-radio>
      <v-radio label="Common" :value="false"></v-radio>
    </v-radio-group>
  </v-card-text>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class KrosmasterName extends Vue {
  get content(): string {
    return this.$store.state.krosmaster.name;
  }

  set content(content: string) {
    this.$store.commit("krosmaster/setName", content);
  }

  get isElite(): boolean {
    return this.$store.state.krosmaster.isElite;
  }

  set isElite(isElite: boolean) {
    this.$store.commit("krosmaster/setElite", isElite);
  }
}
</script>

<style lang="scss">
[role="radiogroup"] {
  justify-content: center;
}
</style>

<style lang="scss" scoped>
h1 {
  padding: 0.6em;
  padding-bottom: 1em;
}
</style>
