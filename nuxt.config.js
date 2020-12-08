import colors from "vuetify/es5/util/colors";

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: "%s - Krosmaker",
    title: "Krosmaster: Blast Card Creator",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "A web-based tool that allows to create custom Krosmaster: Blast cards.",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Global CSS
   */
  css: ["~assets/style/global.scss"],
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
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxt/typescript-build", "@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: ["nuxt-i18n"],
  /*
   ** vuetify module configuration
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
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
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
   ** See https://i18n.nuxtjs.org/options-reference/
   */
  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.js" },
      { code: "pl", iso: "pl-PL", file: "pl.js" },
    ],
    defaultLocale: "en",
    lazy: true,
    langDir: "locales/",
  },
};
