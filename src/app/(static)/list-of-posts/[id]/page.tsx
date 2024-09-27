import { type Metadata } from "next"
import { redirect } from "next/navigation"

import { metadataPosts } from "@/helpers/metadata-post"
import { getServerData } from "@/helpers/server-data"

export async function generateMetadata({ params: { id } }: IParams): Promise<Metadata> {
  const current = (await getServerData.posts)?.data?.find((item) => Number(item.id) === Number(id))

  return metadataPosts({ data: current! })
}

export async function generateStaticParams() {
  return (await getServerData.posts)?.data?.map((item) => ({ id: String(item.id) })) ?? []
}

export default ({ params: { id } }: IParams) => (id ? redirect(`/post/${id}`) : redirect("/"))

interface IParams {
  params: { id: number | string }
}
