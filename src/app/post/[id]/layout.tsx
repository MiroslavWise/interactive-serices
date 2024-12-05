import { type Metadata } from "next"
import { type PropsWithChildren } from "react"

import { getPostId } from "@/services/posts"
import { metadataPosts } from "@/helpers/metadata-post"
import env from "@/config/environment"

export const dynamicParams = true
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params

  if (!id) return {}

  const { data } = await getPostId(id)

  return metadataPosts({ data: data! })
}

export default async ({ children, params: { id } }: PropsWithChildren<{ params: { id: string } }>) => {
  const { data } = await getPostId(id)

  const { title, notes = [], user } = data ?? {}

  let description = ""

  for (const item of notes) {
    if (item.main) {
      description = item.description
      break
    }
  }

  return (
    <main className="w-full flex items-center justify-center h-full">
      <section itemScope itemType="https://schema.org/Offer" className="max-w-96 flex flex-col gap-2 my-auto">
        <h1 itemProp="name">{title}</h1>
        <link itemProp="mobileUrl" href={new URL(`${env.server.host}/post/${id}`).toString()} />
        <meta itemProp="seller" content={user?.firstName} />
        <span itemProp="description">{description}</span>
        {children}
      </section>
    </main>
  )
}
