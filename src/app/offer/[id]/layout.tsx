import { type Metadata } from "next"
import { type PropsWithChildren } from "react"

import env from "@/config/environment"
import { getIdOffer } from "@/services"
import { metadataOffers } from "@/helpers/metadata-offers"

export const dynamicParams = true
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export async function generateMetadata({ params: { id } }: { params: { id: string } }): Promise<Metadata> {
  if (!id) return {}
  const { data } = await getIdOffer(Number(id))

  return metadataOffers({ data: data! })
}

export default async ({ children, params: { id } }: PropsWithChildren<{ params: { id: string } }>) => {
  const { data } = await getIdOffer(Number(id))

  const { title, description, category, slug, user } = data ?? {}

  return (
    <main className="w-full flex items-center justify-center h-full">
      <section itemScope itemType="https://schema.org/Offer" className="max-w-96 flex flex-col gap-2 my-auto">
        <h1 itemProp="name">{title}</h1>
        <h3 itemProp="category">{category?.title}</h3>
        <link itemProp="mobileUrl" href={new URL(`${env.server.host}/offer/${id}/${String(slug)}`).toString()} />
        <meta itemProp="seller" content={user?.firstName} />
        <span itemProp="description">{description}</span>
        {children}
      </section>
    </main>
  )
}
