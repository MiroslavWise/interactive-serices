import { type Metadata } from "next"
import { type PropsWithChildren } from "react"

import { getUserId } from "@/services"
import { keyWords } from "@/config/environment"

export const generateMetadata = async ({ params }: { params: { id: string | number } }): Promise<Metadata> => {
  const { id } = params ?? {}
  if (!id) return {}
  const { data } = await getUserId(id)
  if (!data) return {}

  const { profile } = data ?? {}

  const name = `${profile?.firstName || "Имя"} ${profile?.lastName || "Фамилия"}`

  return {
    title: name,
    keywords: [...keyWords, name],
    description: profile?.about || `Пользователь ${profile?.username}`,
    openGraph: {
      title: name,
      description: profile?.about ?? `Пользователь ${name}`,
      images: profile?.image?.attributes?.url || "/icons/icon.png",
    },
    twitter: {
      title: name,
      description: profile?.about ?? `Пользователь ${name}`,
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

export default ({ children }: PropsWithChildren) => children
