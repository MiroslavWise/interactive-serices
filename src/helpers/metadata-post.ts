import "server-only"

import { type Metadata } from "next"

import { type IPosts } from "@/services/posts/types"

import env, { keyWords } from "@/config/environment"
import { metadataImages } from "./metadata-images"

interface IData {
  data: IPosts
}

export function metadataPosts({ data }: IData): Metadata {
  const meta: Metadata = {}

  if (!data) return meta

  const { id, title, notes, user, created } = data ?? {}

  meta.title = title
  meta.keywords = [title, ...keyWords]

  const note = notes?.find((item) => item.main)

  if (note) {
    meta.description = note?.description ?? `Описание: ${title ?? ""}`
  }

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

  // const metadataBase = new URL(`${env.server.host}/post/${id}`)
  // meta.metadataBase = metadataBase

  const metaImgs = metadataImages({ images: note!?.images ?? [] })
  meta.icons = metaImgs.icons

  meta.openGraph = {
    title: title,
    siteName: `${title} | Sheira`,
    type: "website",
    locale: "ru_RU",
    // url: metadataBase,
    description: note?.description ?? `Описание: ${title ?? ""}`,
    // images: metaImgs.images.reverse(),
  }

  meta.twitter = {
    title: title,
    creator: name,
    site: `Sheira`,
    card: "summary_large_image",
    // images: metaImgs.images.reverse(),
    description: note?.description ?? `Описание: ${title ?? ""}`,
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
