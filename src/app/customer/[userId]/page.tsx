import { cache, Suspense } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { type IParamsCustomer } from "./layout"

import Accomplishments from "./components/Accomplishments"

import { getUserId } from "@/services"
import BlockMobileFriendsAndFeedback from "./components/BlockMobileFriendsAndFeedback"
import { cx } from "@/lib/cx"

const get = cache(getUserId)

export const generateMetadata = async ({ params }: IParamsCustomer): Promise<Metadata> => {
  const id = params?.userId ?? null

  if (!id) return {}

  const { res, ok } = await get(id)

  if (!ok || !res) return {}

  const { profile } = res ?? {}

  return {
    title: `${profile?.firstName || ""} ${profile?.lastName || ""}`,
    description: profile?.about || `Пользователь ${profile?.username}`,
    openGraph: {
      images: profile?.image?.attributes?.url || "/icons/icon.png",
    },
    twitter: {
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

  if (!id) return redirect("/")

  return (
    <>
      <Accomplishments id={id} />
      <Suspense
        fallback={
          <article
            className={cx(
              "w-full loading-screen flex md:hidden flex-col gap-4 p-4 bg-BG-second rounded-[0.625rem]",
              "[&>section]:w-full [&>section]:grid [&>section]:grid-cols-[minmax(0,1fr)_3.125rem] [&>section]:gap-0.625",
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
