import colors from "vuetify/es5/util/colors";

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static",
  /*
   ** Server side rendering in development mode
   ** See https://nuxtjs.org/docs/configuration-glossary/configuration-ssr
   */
  ssr: false,
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: "Krosmaker · %s",
    title: "Krosmaster: Blast Card Creator",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "An online card creator for the Krosmaster: Blast board game.",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", type: "image/png", href: "/logo-192.png" },
    ],
  },
  /*
   ** Global CSS
   */
  css: [
    "normalize.css/normalize.css",
    "sanitize.css/sanitize.css",
    "~assets/style/global.scss",
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: "~/plugins/cropper.js", ssr: true },
    { src: "~/plugins/debounce.js", ssr: true },
    { src: "~/plugins/fragment.js", ssr: true },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: [
    "~/components/cards",
    "~/components/cards/control",
    "~/components/cards/challenge",
    "~/components/cards/favor",
    "~/components/cards/fighter",
    "~/components/common",
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxt/typescript-build", "@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: ["nuxt-i18n"],
  /*
   ** Vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/style/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.lighten1,
          error: colors.red.lighten1,
          success: colors.green.accent3,
        },
      },
    },
  },
  /**
   ** Environment variables loaded and replaced during build
   */
  env: {
    version: require("./package.json").version,
    gitHash: require("child_process").execSync("git rev-parse --short HEAD", {
      encoding: "utf8",
    }),
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  /*
   ** Internationalization plugin configuration
   ** See https://i18n.nuxtjs.org/options-reference/
   */
  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.js" },
      { code: "fr", iso: "fr-FR", file: "fr.js" },
      { code: "es", iso: "es-ES", file: "es.js" },
      { code: "br", iso: "pt-BR", file: "br.js" },
      { code: "pl", iso: "pl-PL", file: "pl.js" },
    ],
    defaultLocale: "en",
    lazy: true,
    langDir: "locales/",
  },
};
