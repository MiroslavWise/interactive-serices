import { cache } from "react"
import { type Metadata } from "next"
import { redirect } from "next/navigation"

import env from "@/config/environment"
import { getPosts } from "@/services/posts"
import { metadataPosts } from "@/helpers/metadata-post"

const getCachePosts = cache(getPosts)

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const { id } = params ?? {}

  const { data } = await (env.server.host.includes("dev") ? Promise.resolve({ data: [] }) : getCachePosts({ order: "DESC", archive: 0 }))

  const current = data?.find((item) => Number(item.id) === Number(id))

  return metadataPosts({ data: current! })
}

export async function generateStaticParams() {
  const { data } = await (env.server.host.includes("dev") ? Promise.resolve({ data: [] }) : getCachePosts({ order: "DESC", archive: 0 }))

  return data?.map((item) => ({ id: String(item.id) })) ?? []
}

export default ({ params }: IParams) => {
  const { id } = params ?? {}

  return redirect(`/post/${id}`)
}

interface IParams {
  params: { id: number | string }
}
