<template>
  <v-app dark>
    <v-app-bar fixed app clipped-left height="64">
      <v-toolbar-title class="toolbar-title">Krosmaker</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y nudge-left="6">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon class="locale-button" v-bind="attrs" v-on="on">
            {{ getIconForLocale(currentLocale.iso) }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            class="ma-0 mr-2 ml-2 pa-0"
            v-for="(locale, index) in locales"
            :key="index"
          >
            <nuxt-link class="locale-link" :to="switchLocalePath(locale.code)">
              <v-btn icon large class="locale-button">{{
                getIconForLocale(locale.iso)
              }}</v-btn>
            </nuxt-link>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        icon
        href="https://github.com/krosmaker/krosmaker/wiki/Tutorial"
        target="_blank"
        rel="noopener noreferrer"
      >
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
      <v-btn
        icon
        href="https://twitter.com/krosmaker"
        target="_blank"
        rel="noopener noreferrer"
      >
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn
        icon
        href="https://github.com/krosmaker/krosmaker"
        target="_blank"
        rel="noopener noreferrer"
      >
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container
        fill-height
        fill-width
        fluid
        class="fade-in-container"
        ref="container"
      >
        <nuxt />
      </v-container>
    </v-main>
    <v-snackbar
      v-for="(notification, index) in notifications"
      :key="notification.id"
      app
      :value="notification.show"
      :timeout="3000"
      right
      top
      :color="notification.color + ' darken-4'"
      @input="onNotificationHide(notification)"
      :style="`margin-top: ${60 * index + 8}px;`"
    >
      {{ $t(notification.message, notification.parameters) }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          icon
          v-bind="attrs"
          @click="onNotificationHide(notification)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-footer class="main-footer" dark height="auto">
      <v-card class="flex" flat tile>
        <v-divider />
        <v-card-actions class="justify-center">
          <span class="font-weight-light caption">
            {{ $t("disclaimer") }}
          </span>
        </v-card-actions>
        <v-divider />
        <div class="version">{{ version }}-{{ hash }}</div>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import localeEmoji from "locale-emoji";

import { Notification } from "~/store/notification";

interface LocaleObject {
  code: string;
  iso: string;
  file: string;
}

@Component
export default class DefaultLayout extends Vue {
  get currentLocale(): LocaleObject {
    const localeCode = this.$i18n.locale || "en";
    return (this.$i18n.locales || []).find(
      (locale) => (locale as any).code === localeCode
    ) as LocaleObject;
  }

  get locales(): LocaleObject[] {
    const currentLocale = this.currentLocale.code;
    return (this.$i18n.locales || []).filter(
      (locale) => (locale as any).code !== currentLocale
    ) as LocaleObject[];
  }

  get version(): string {
    return process.env.version || "local";
  }

  get hash(): string {
    return process.env.gitHash || "dev";
  }

  get notifications(): Notification[] {
    return this.$store.state.notification.notifications;
  }

  getIconForLocale(code: string): string {
    return localeEmoji(code);
  }

  onNotificationHide(notification: Notification) {
    this.$store.commit("notification/hide", notification.id);
    setTimeout(
      () => this.$store.commit("notification/remove", notification.id),
      300
    );
  }

  mounted() {
    const container = this.$refs.container as HTMLElement;
    container.classList.add("displayed-container");
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

.fade-in-container {
  opacity: 0;
  transition: opacity 0.5s ease-in;
}

.displayed-container {
  opacity: 1;
}

.locale-link {
  text-decoration: none;
}

.locale-button {
  font-size: 20px;
}

.locale-select {
  width: 50px !important;
}
</style>
