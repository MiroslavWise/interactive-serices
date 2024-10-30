import { type Metadata } from "next"
import { redirect } from "next/navigation"

import { getServerData } from "@/helpers/server-data"
import { metadataOffers } from "@/helpers/metadata-offers"

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const { id } = params
  const current = (await getServerData.discussions)?.data?.find((item) => Number(item.id) === Number(id))

  return metadataOffers({ data: current! })
}

export async function generateStaticParams() {
  return (await getServerData.discussions)?.data?.map((item) => ({ id: String(item.id) })) ?? []
}

export default ({ params }: IParams) => {
  const { id } = params

  return id ? redirect(`/offer/${id}`) : redirect("/")
}

interface IParams {
  params: { id: string }
}
