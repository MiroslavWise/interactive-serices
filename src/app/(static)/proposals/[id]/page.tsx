import { cache } from "react"
import { type Metadata } from "next"
import { redirect } from "next/navigation"
import { type OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

import { EnumTypeProvider } from "@/types/enum"

import { getOffers } from "@/services"
import env from "@/config/environment"

const getCache = cache(getOffers)

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const { id } = params ?? {}

  const { data } = await (env.server.host.includes("dev")
    ? Promise.resolve({ data: [] })
    : getCache({ provider: EnumTypeProvider.offer, order: "DESC" }))

  const current = data?.find((item) => Number(item.id) === Number(id))

  if (!!current) {
    const obj: Metadata = {
      title: current?.category?.title,
      description: current.description,
    }

    const images: OpenGraph["images"] = []

    for (const image of current.images ?? []) {
      images.push({
        url: image.attributes.url.replace("?format=webp", ""),
        secureUrl: image.attributes.url.replace("?format=webp", ""),
        alt: image.attributes.alt,
        width: 256,
        height: 256,
      })
    }

    const user = current?.user

    if (user) {
      const name = `${user?.firstName ?? "Имя"} ${user?.lastName ?? "Фамилия"}`

      obj.authors = {
        name: name,
        url: `${env.server.host}/user/${user?.id}/${user?.username}`,
      }
      obj.creator = name
      obj.publisher = name
      obj.formatDetection = {
        email: true,
        telephone: true,
        address: true,
      }
    }

    const metadataBase = new URL(`${env.server.host}/offer/${id}/${String(current.slug)}`)
    obj.metadataBase = metadataBase

    obj.openGraph = {
      type: "article",
      publishedTime: current?.created as string,
      locale: "ru",
      description: current?.description ?? current?.title ?? "",
      url: `${env.server.host}/offer/${id}/${String(current.slug).replaceAll("/", "-")}`,
      images: images,
      authors: [user?.firstName ?? "Имя", user?.lastName ?? "Фамилия"],
    }
    obj.twitter = {
      images: images,
    }
    obj.robots = {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    }

    return obj
  } else {
    return {}
  }
}

export async function generateStaticParams() {
  const { data } = await (env.server.host.includes("dev")
    ? Promise.resolve({ data: [] })
    : getCache({ provider: EnumTypeProvider.offer, order: "DESC" }))

  return data?.map((item) => ({ id: String(item.id) })) ?? []
}

export default ({ params }: IParams) => {
  const { id } = params ?? {}

  return redirect(`/offer/${id}`)
}

interface IParams {
  params: { id: number | string }
}
