import { type Metadata } from "next"
import { type PropsWithChildren } from "react"

import { getPostId } from "@/services/posts"
import { metadataPosts } from "@/helpers/metadata-post"

export const dynamicParams = true
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params ?? {}
  if (!id) return {}

  const { data } = await getPostId(id)

  return metadataPosts({ data: data! })
}

export default ({ children }: PropsWithChildren) => children
