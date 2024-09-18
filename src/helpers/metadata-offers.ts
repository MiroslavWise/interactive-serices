import "server-only"

import { type Metadata } from "next"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffers } from "@/services/offers/types"

import env from "@/config/environment"
import { metadataImages } from "./metadata-images"

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

  const metaImgs = metadataImages({ images: data.images })
  meta.icons = metaImgs.icons

  const name = `${user?.firstName ?? "Имя"} ${user?.lastName ?? "Фамилия"}`
  if (user) {
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
    type: "website",
    locale: "ru_RU",
    description: description ?? "",
    url: metadataBase,
    images: metaImgs.images.reverse(),
  }
  meta.twitter = {
    title: title,
    creator: name,
    site: `Sheira`,
    card: "summary_large_image",
    images: metaImgs.images.reverse(),
    description: description ?? `Описание: ${title ?? ""}`,
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
