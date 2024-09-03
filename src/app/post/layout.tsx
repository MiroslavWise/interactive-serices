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
  // const {data: dataNotes} = await getNotes({order: "DESC"})

  const obj: Metadata = {}

  if (!!data) {
    obj.title = data.title

    obj.openGraph = {
      type: "website",
      locale: "ru",
      url: `${env.server.host}/post/${id}/${String(data.slug).replaceAll("/", "-")}`,
      // images: data.images ? data.images.map((_) => _.attributes.url) : undefined,
    }
  }

  return obj
}

export default ({ children }: { children: ReactNode }) => children
