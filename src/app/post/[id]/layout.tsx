import { type Metadata } from "next"
import { type ReactNode } from "react"
import { type OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

import env from "@/config/environment"
import { getPostId } from "@/services/posts"

export const dynamicParams = true
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params ?? {}
  if (!id) return {}
  const { data } = await getPostId(id)

  const obj: Metadata = {}

  if (!!data) {
    obj.title = data.title

    obj.keywords = data.title.split(" ").map((_) => _.replace(/\w/g, ""))

    const note = data?.notes?.find((item) => item?.main)

    if (note) {
      obj.description = note?.description ?? undefined
    }

    const images: OpenGraph["images"] = []

    if (note?.images.length) {
      for (const image of note.images) {
        images.push({
          url: image.attributes.url,
          secureUrl: image.attributes.url,
          alt: image.attributes.alt,
          width: 256,
          height: 256,
        })
      }
    }

    const metadataBase = new URL(`${env.server.host}/post/${id}/${String(data.slug)}`)
    obj.metadataBase = metadataBase

    obj.openGraph = {
      type: "website",
      locale: "ru",
      countryName: "ru",
      url: `${env.server.host}/post/${id}/${String(data.slug).replaceAll("/", "-")}`,
      images: images,
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
