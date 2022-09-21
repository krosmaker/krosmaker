<template>
  <v-app dark>
    <v-app-bar fixed app clipped-left height="64">
      <v-toolbar-title class="toolbar-title">Krosmaker</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <img :src="require(`~/assets/img/locale/${currentLocale}.png`)" />
          </v-btn>
        </template>
        <v-list>
          <nuxt-link
            :to="switchLocalePath(locale.code)"
            v-for="(locale, index) in locales"
            :key="index"
          >
            <v-list-item>
              <img :src="require(`~/assets/img/locale/${locale.code}.png`)" />
            </v-list-item>
          </nuxt-link>
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

import { Notification } from "~/store/notification";

@Component
export default class DefaultLayout extends Vue {
  get currentLocale() {
    return this.$i18n.locale || { code: "en" };
  }

  get locales() {
    const currentLocale = this.currentLocale;
    return (this.$i18n.locales || []).filter(
      (locale) => (locale as any).code !== currentLocale
    );
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

.locale-select {
  width: 50px !important;
}
</style>
