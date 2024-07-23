import { type Metadata } from "next"
import { type ReactNode } from "react"

import { getUserId } from "@/services"
import { decryptedUser } from "@/helpers/cript"

export const generateMetadata = async ({ params }: { params: { "hash-user": string } }): Promise<Metadata> => {
  const { "hash-user": hash } = params ?? {}
  if (!hash) return {}
  const id = decryptedUser(hash)
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
