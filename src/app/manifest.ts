import { MetadataRoute } from "next"

export default function (): MetadataRoute.Manifest {
  return {
    name: "Sheira - сервис с интерактивной картой городов",
    short_name: "Sheira",
    description:
      "Sheira - сервис с интерактивной картой городов. Обычные люди размещают здесь свои услуги для обмена и продажи, обсуждают важные вопросы и сообщают о локальных проблемах.",
    start_url: "/",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}
