import { type MetadataRoute } from "next"

import { APPLE_ID, URL_APPLE_APP } from "@/config/environment"

export default function (): MetadataRoute.Manifest {
  return {
    name: "Sheira - сервис с интерактивной картой городов",
    short_name: "Sheira",
    description:
      "Sheira - сервис с интерактивной картой городов. Обычные люди размещают здесь свои услуги для обмена и продажи, обсуждают важные вопросы и сообщают о локальных проблемах.",
    orientation: "portrait",
    related_applications: [
      {
        platform: "itunes",
        url: URL_APPLE_APP,
        id: APPLE_ID,
      },
      {
        platform: "ios",
        url: URL_APPLE_APP,
        id: APPLE_ID,
      },
      {
        platform: "ipad",
        url: URL_APPLE_APP,
        id: APPLE_ID,
      },
      {
        platform: "iphone",
        url: URL_APPLE_APP,
        id: APPLE_ID,
      },
    ],
    categories: [
      "business",
      "education",
      "food",
      "fitness",
      "health",
      "lifestyle",
      "navigation",
      "news",
      "personalization",
      "photo",
      "productivity",
      "sports",
    ],
    prefer_related_applications: true,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "192x192",
        type: "image/x-icon",
      },
    ],
  }
}
