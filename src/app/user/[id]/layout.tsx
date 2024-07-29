import { type Metadata } from "next"
import { type ReactNode } from "react"

import { getUserId } from "@/services"

export const generateMetadata = async ({ params }: { params: { id: string | number } }): Promise<Metadata> => {
  const { id } = params ?? {}
  if (!id) return {}
  const { data } = await getUserId(id)
  if (!data) return {}

  const { profile } = data ?? {}

  return {
    title: `${profile?.firstName || ""} ${profile?.lastName || ""}`,
    description: profile?.about || `Пользователь ${profile?.username}`,
    openGraph: {
      images: profile?.image?.attributes?.url || "/icons/icon.png",
    },
    twitter: {
      images: profile?.image?.attributes?.url || "/icons/icon.png",
    },
    category: "people, user, customers, offers",
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "standard",
      },
    },
  }
}

export default ({ children }: { children: ReactNode }) => children
