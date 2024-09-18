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

  const metadataBase = new URL(`${env.server.host}/post/${id}/${String(data.slug)}`)
  meta.metadataBase = metadataBase

  const metaImgs = metadataImages({ images: note!?.images ?? [] })
  meta.icons = metaImgs.icons

  meta.openGraph = {
    title: title,
    siteName: `${title} | Sheira`,
    type: "article",
    locale: "ru_RU",
    countryName: "ru",
    description: note?.description ?? `Описание: ${title ?? ""}`,
    images: metaImgs.images.reverse(),
    publishedTime: created,
    authors: [user.firstName ?? "Имя", user?.lastName ?? "Фамилия"],
  }

  meta.twitter = {
    card: "summary_large_image",
    images: metaImgs.images.reverse(),
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
