// https://nuxt.com/docs/api/configuration/nuxt-config
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "dayjs-nuxt", "nuxt-auth-utils", "nuxt-gravatar"],
  dayjs: {
    locales: ["pt-br"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: [
      "pt-br",
      {
        relativeTime: {
          future: "em %s",
          past: "%s atrás",
          s: "alguns segundos atrás",
          m: "um minuto",
          mm: "%d minutos",
          h: "uma hora",
          hh: "%d horas",
          d: "um dia",
          dd: "%d dias",
          M: "um mês",
          MM: "%d meses",
          y: "um ano",
          yy: "%d anos",
        },
      },
    ],
    defaultTimezone: "America/Sao_Paulo",
  },
  app: {
    head: {
      title: "My Split Wise",
    },
  },
  runtimeConfig: {
    public: {
      // Config within public will be also exposed to the client
      SENTRY_DSN_PUBLIC: process.env.SENTRY_DSN_PUBLIC,
      SENTRY_TRACES_SAMPLE_RATE: parseFloat(
        process.env.SENTRY_TRACES_SAMPLE_RATE ?? "0"
      ),
      SENTRY_REPLAY_SAMPLE_RATE: parseFloat(
        process.env.SENTRY_REPLAY_SAMPLE_RATE ?? "0"
      ),
      SENTRY_ERROR_REPLAY_SAMPLE_RATE: parseFloat(
        process.env.SENTRY_ERROR_REPLAY_SAMPLE_RATE ?? "0"
      ),
    },
  },
  sourcemap: true,
  vite: {
    plugins: [
      // Put the Sentry vite plugin after all other plugins
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: "personal-6w5",
        project: "msw",
      }),
    ],
  },
});
