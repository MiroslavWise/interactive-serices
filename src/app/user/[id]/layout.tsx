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

  const name = `${profile?.firstName || "Имя"} ${profile?.lastName || ""}`

  const title = `Профиль и предложения пользователя ${profile?.username ?? ""} на Sheira. Люди, услуги, события`
  const description = `Приглашаю присоединиться к Sheira, где мы вместе сможем помогать другим людям`

  return {
    title: title,
    keywords: [...keyWords, name],
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: profile?.image?.attributes?.url || "/icons/icon.png",
    },
    twitter: {
      title: title,
      description: description,
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
