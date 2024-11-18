import "server-only"

import { type Metadata } from "next"

import { type IPosts } from "@/services/posts/types"

import { metadataImages } from "./metadata-images"
import env, { keyWords } from "@/config/environment"

interface IData {
  data: IPosts
}

export function metadataPosts({ data }: IData): Metadata {
  const meta: Metadata = {}

  if (!data) return meta

  const { id, title, notes, user } = data ?? {}

  const metaTitle = title.slice(0, 89)

  meta.title = metaTitle
  meta.keywords = [title, ...keyWords]

  const note = notes?.find((item) => item.main)

  if (note) {
    meta.description = note?.description ?? `Описание: ${metaTitle ?? ""}`
  }

  const name = `${user?.firstName ?? "Имя"} ${user?.lastName || ""}`

  if (user) {
    const userName = user?.username && !user?.username.includes("$") && !user?.username.includes("/") ? `/${user?.username}` : ""
    meta.authors = {
      name: name,
      url: `${env.server.host}/user/${user?.id}` + userName,
    }
    meta.creator = name
    meta.publisher = name
    meta.formatDetection = {
      email: true,
      telephone: true,
      address: true,
    }
  }

  const metadataBase = new URL(`${env.server.host}/post/${id}`)
  meta.metadataBase = metadataBase

  const metaImgs = metadataImages({ images: note!?.images ?? [] })
  meta.icons = metaImgs.icons

  meta.openGraph = {
    title: metaTitle,
    siteName: `${metaTitle.slice(0, 80)} | Sheira`,
    type: "website",
    locale: "ru_RU",
    url: metadataBase,
    description: note?.description ?? `Описание: ${metaTitle ?? ""}`,
    // images: metaImgs.images.reverse(),
  }

  meta.twitter = {
    title: metaTitle.slice(0, 69),
    creator: name,
    site: `Sheira`,
    card: "summary_large_image",
    images: metaImgs.images.reverse(),
    description: note?.description?.slice(0, 199) ?? `Описание: ${metaTitle ?? ""}`,
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
