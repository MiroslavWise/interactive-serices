import { cache } from "react"
import { type Metadata } from "next"
import { redirect } from "next/navigation"

import { EnumTypeProvider } from "@/types/enum"

import { getOffers } from "@/services"
import env from "@/config/environment"
import { metadataOffers } from "@/helpers/metadata-offers"

const getCache = cache(getOffers)

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const { id } = params ?? {}

  const { data } = await (env.server.host.includes("dev")
    ? Promise.resolve({ data: [] })
    : getCache({ provider: EnumTypeProvider.alert, order: "DESC" }))

  const current = data?.find((item) => Number(item.id) === Number(id))

  return metadataOffers({ data: current! })
}

export async function generateStaticParams() {
  const { data } = await (env.server.host.includes("dev")
    ? Promise.resolve({ data: [] })
    : getCache({ provider: EnumTypeProvider.alert, order: "DESC" }))

  return data?.map((item) => ({ id: String(item.id) })) ?? []
}

export default ({ params }: IParams) => {
  const { id } = params ?? {}

  return redirect(`/offer/${id}`)
}

interface IParams {
  params: { id: number | string }
}
