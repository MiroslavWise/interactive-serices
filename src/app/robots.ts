import { MetadataRoute } from "next"

import env from "@/config/environment"

export default function (): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/legal/ads-agreement/", "/legal/privacy-policy/", "/legal/terms/", "/registration"],
      },
    ],
    sitemap: `${env.server.host}/sitemap.xml`,
  }
}
