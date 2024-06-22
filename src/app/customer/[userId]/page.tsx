import { cache } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { type IParamsCustomer } from "./layout"

import Accomplishments from "./components/Accomplishments"

import { getUserId } from "@/services"

const get = cache(getUserId)

export const generateMetadata = async ({ params }: IParamsCustomer): Promise<Metadata> => {
  const id = params?.userId ?? null

  if (!id) return {}

  const { res, ok } = await get(id)

  if (!ok || !res) return {}

  const { profile } = res ?? {}

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

export default async ({ params }: IParamsCustomer) => {
  const id = params?.userId ?? null

  if (!id) return redirect("/")

  return <Accomplishments id={id} />
}
