import { type Metadata } from "next"
import { redirect } from "next/navigation"

import { getServerData } from "@/helpers/server-data"
import { metadataOffers } from "@/helpers/metadata-offers"

export async function generateMetadata({ params: { id } }: IParams): Promise<Metadata> {
  const current = (await getServerData.alerts)?.data?.find((item) => Number(item.id) === Number(id))

  return metadataOffers({ data: current! })
}

export async function generateStaticParams() {
  return (await getServerData.alerts)?.data?.map((item) => ({ id: String(item.id) })) ?? []
}

export default ({ params: { id } }: IParams) => (id ? redirect(`/offer/${id}`) : redirect("/"))

interface IParams {
  params: { id: number | string }
}
