// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "dayjs-nuxt", "nuxt-auth-utils"],
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
    oauth: {
      github: {
        clientId: "9c1a3e61aeb0670a8f4c",
        clientSecret: "1b4d821ff4f336d376f24beade3f010d6f6e2df7",
      },
    },
  },
});
