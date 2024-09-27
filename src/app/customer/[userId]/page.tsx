import { Suspense } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { type IParamsCustomer } from "./layout"

import Accomplishments from "./components/Accomplishments"
import BlockMobileFriendsAndFeedback from "./components/BlockMobileFriendsAndFeedback"

import { cx } from "@/lib/cx"
import { getUserId } from "@/services"
import { keyWords } from "@/config/environment"

export const generateMetadata = async ({ params }: IParamsCustomer): Promise<Metadata> => {
  const id = params?.userId ?? null

  if (!id) return {}

  const { data } = await getUserId(id)

  if (!data) return {}

  const { profile } = data ?? {}

  const name = `${profile?.firstName || "Имя"} ${profile?.lastName || "Фамилия"}`

  return {
    title: name,
    keywords: [...keyWords],
    description: profile?.about ?? `Пользователь ${profile?.username}`,
    openGraph: {
      title: name,
      description: profile?.about ?? `Пользователь ${profile?.username}`,
      images: profile?.image?.attributes?.url || "/icons/icon.png",
    },
    twitter: {
      title: name,
      description: profile?.about ?? `Пользователь ${profile?.username}`,
      images: profile?.image?.attributes?.url || "/icons/icon.png",
    },
    category: "people, user, customers, offers",
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "standard",
      },
    },
  }
}

export default async ({ params }: IParamsCustomer) => {
  const id = params?.userId ?? null
  const { data } = await getUserId(id)
  if (!id || !data) return redirect("/")

  return (
    <>
      <Accomplishments id={id} />
      <Suspense
        fallback={
          <article
            className={cx(
              "w-full loading-screen flex md:hidden flex-col gap-4 p-4 bg-BG-second rounded-.625",
              "[&>section]:w-full [&>section]:grid [&>section]:grid-cols-[minmax(0,1fr)_3.125rem] [&>section]:gap-2.5",
              "[&>section>span]:h-6 [&>section>span]:w-full [&>section>span]:rounded-xl",
            )}
          >
            <section>
              <span />
              <span />
            </section>
            <section>
              <span />
              <span />
            </section>
          </article>
        }
      >
        <BlockMobileFriendsAndFeedback id={id!} />
      </Suspense>
    </>
  )
}
