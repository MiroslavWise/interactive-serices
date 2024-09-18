import { type Metadata } from "next"
import { type PropsWithChildren } from "react"
import { type OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

import { getNotes } from "@/services/notes"
import { getPostId } from "@/services/posts"
import env, { keyWords } from "@/config/environment"

export const dynamicParams = true
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

function replace(value: string): string {
  return value.replace("?format=webp", "")
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params ?? {}
  if (!id) return {}

  const [{ data }, { data: dataNote }] = await Promise.all([getPostId(id), getNotes({ post: Number(id!), main: true, order: "DESC" })])

  const obj: Metadata = {}

  if (!!data) {
    obj.title = data.title
    obj.keywords = [data.title, ...keyWords]

    const note = (dataNote && dataNote[0]) ?? null

    if (note) {
      obj.description = note?.description ?? `Описание: ${obj.title ?? ""}`
    }

    const user = data?.user

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

    const images: OpenGraph["images"] = []

    if (!!note?.images.length) {
      for (const image of note.images) {
        images.push({
          url: replace(image.attributes.url),
          secureUrl: replace(image.attributes.url),
          alt: image.attributes.alt,
          width: 256,
          height: 256,
        })
      }

      obj.icons = {
        icon: {
          url: replace(note?.images[0]?.attributes?.url!),
          rel: "icon",
          fetchPriority: "low",
        },
      }
    }

    const metadataBase = new URL(`${env.server.host}/post/${id}/${String(data.slug)}`)
    obj.metadataBase = metadataBase

    obj.openGraph = {
      title: data.title,
      siteName: `${data.title} | Sheira`,
      type: "article",
      locale: "ru",
      countryName: "ru",
      description: note?.description ?? `Описание: ${obj.title ?? ""}`,
      images: images.reverse(),
      publishedTime: data?.created,
      authors: [user.firstName ?? "Имя", user?.lastName ?? "Фамилия"],
    }

    obj.twitter = {
      images: images.reverse(),
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

export default ({ children }: PropsWithChildren) => children
