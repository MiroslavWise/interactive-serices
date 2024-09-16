import { type Metadata } from "next"
import { type ReactNode } from "react"
import { type OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

import { EnumTypeProvider } from "@/types/enum"

import env from "@/config/environment"
import { getIdOffer } from "@/services"

export const dynamicParams = true
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params ?? {}
  if (!id) return {}
  const { data: offer } = await getIdOffer(Number(id))

  const obj: Metadata = {}

  if (!!offer) {
    if (offer.provider === EnumTypeProvider.offer) {
      obj.title = offer?.category?.title
    } else {
      obj.title = offer.title
    }
    obj.description = offer.description

    const images: OpenGraph["images"] = []

    for (const image of offer.images ?? []) {
      images.push({
        url: image.attributes.url.replace("?format=webp", ""),
        secureUrl: image.attributes.url.replace("?format=webp", ""),
        alt: image.attributes.alt,
        width: 256,
        height: 256,
      })
    }
    images.push({
      url: `${env.server.host!}/api/og`,
      secureUrl: `${env.server.host!}/api/og`,
      alt: "SHEIRA",
      width: 512,
      height: 256,
    })

    const user = offer?.user

    if (user) {
      const name = `${user?.firstName ?? "Имя"} ${user?.lastName ?? "Фамилия"}`

      obj.authors = {
        name: name,
        url: `${env.server.host}/user/${user?.id}/${user?.username}`,
      }
      obj.creator = name
      obj.publisher = name
      obj.formatDetection = {
        email: true,
        telephone: true,
        address: true,
      }
    }

    const metadataBase = new URL(`${env.server.host}/post/${id}/${String(offer.slug)}`)
    obj.metadataBase = metadataBase

    obj.openGraph = {
      type: "article",
      publishedTime: offer?.created as string,
      locale: "ru",
      description: offer?.description ?? offer?.title ?? "",
      url: `${env.server.host}/offer/${id}/${String(offer.slug).replaceAll("/", "-")}`,
      images: images,
      authors: [user?.firstName ?? "Имя", user?.lastName ?? "Фамилия"],
    }
    obj.twitter = {
      images: images,
    }
    obj.robots = {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    }
  }

  return obj
}

export default ({ children }: { children: ReactNode }) => children
