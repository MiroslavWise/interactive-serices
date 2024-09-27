import { type Metadata } from "next"
import { type PropsWithChildren } from "react"

import { getPostId } from "@/services/posts"
import { metadataPosts } from "@/helpers/metadata-post"

export const dynamicParams = true
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export async function generateMetadata({ params: { id } }: { params: { id: string } }): Promise<Metadata> {
  if (!id) return {}

  const { data } = await getPostId(id)

  return metadataPosts({ data: data! })
}

export default ({ children }: PropsWithChildren) => children
