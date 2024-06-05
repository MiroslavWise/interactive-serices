import env from "@/config/environment"
import { MetadataRoute } from "next"

export default function (): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/legal/ads-agreement/", "/legal/privacy-policy/", "/legal/terms/", "/user?id=*", "/registration"],
      },
    ],
    sitemap: `${env.server.host}/sitemap.xml`,
  }
}
