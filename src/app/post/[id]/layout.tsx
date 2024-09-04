import { type Metadata } from "next"
import { type ReactNode } from "react"

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

    const note = data?.notes?.find((item) => item?.main)

    if (note) {
      obj.description = note?.description ?? undefined
    }

    obj.openGraph = {
      type: "website",
      locale: "ru",
      url: `${env.server.host}/post/${id}/${String(data.slug).replaceAll("/", "-")}`,
      images: note?.images ? note?.images.map((_) => _.attributes.url) : undefined,
    }

    obj.twitter = {
      images: note?.images ? note?.images.map((_) => _.attributes.url) : undefined,
    }
  }

  return obj
}

export default ({ children }: { children: ReactNode }) => children
