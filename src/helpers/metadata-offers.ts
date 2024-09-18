import { type Metadata } from "next"
import { type OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

import { type IResponseOffers } from "@/services/offers/types"

import env from "@/config/environment"
import { EnumTypeProvider } from "@/types/enum"

interface IData {
  data: IResponseOffers
}

export function metadataOffers({ data }: IData): Metadata {
  const meta: Metadata = {}

  if (!data) return meta

  const { user, slug, id, title, category, provider, description, created } = data ?? {}

  if (provider === EnumTypeProvider.offer) {
    meta.title = category?.title
  } else {
    meta.title = title
  }
  meta.description = description

  const images: OpenGraph["images"] = []

  if (data.images.length > 0) {
    for (const image of data.images ?? []) {
      images.push({
        url: image.attributes.url.replace("?format=webp", ""),
        alt: image.attributes.alt,
        width: 256,
        height: 256,
      })
    }

    meta.icons = {
      icon: {
        url: replaceURLImage(data.images?.[0]?.attributes?.url!),
        rel: "icon",
        fetchPriority: "low",
      },
    }
  }

  if (user) {
    const name = `${user?.firstName ?? "Имя"} ${user?.lastName ?? "Фамилия"}`

    meta.authors = {
      name: name,
      url: `${env.server.host}/user/${user?.id}/${user?.username}`,
    }
    meta.creator = name
    meta.publisher = name
    meta.formatDetection = {
      email: true,
      telephone: true,
      address: true,
    }
  }

  const metadataBase = new URL(`${env.server.host}/offer/${id}/${String(slug)}`)
  meta.metadataBase = metadataBase

  meta.openGraph = {
    title: provider === EnumTypeProvider.offer ? category?.title : title,
    siteName: `${provider === EnumTypeProvider.offer ? category?.title : title} | Sheira`,
    type: "article",
    publishedTime: created as string,
    locale: "ru_RU",
    description: description ?? "",
    url: `${env.server.host}/offer/${id}/${String(slug).replaceAll("/", "-")}`,
    images: images.reverse(),
    authors: [user?.firstName ?? "Имя", user?.lastName ?? "Фамилия"],
  }
  meta.twitter = {
    images: images.reverse(),
  }
  meta.robots = {
    index: true,
    follow: true,
    "max-image-preview": "standard",
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "standard",
    },
  }

  return meta
}
