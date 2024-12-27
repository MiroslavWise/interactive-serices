import { Suspense } from "react"
import Script from "next/script"
import { type Metadata } from "next"
import { redirect } from "next/navigation"

import { type IParamsCustomer } from "./layout"

import Accomplishments from "./components/Accomplishments"
import BlockMobileFriendsAndFeedback from "./components/BlockMobileFriendsAndFeedback"

import { cx } from "@/lib/cx"
import { getUserId } from "@/services"
import env, { keyWords } from "@/config/environment"

export const generateMetadata = async ({ params }: IParamsCustomer): Promise<Metadata> => {
  const id = params?.userId ?? null

  if (!id) return {}

  const { data } = await getUserId(id)

  if (!data) return {}

  const { profile } = data ?? {}

  const title = `Профиль и предложения пользователя ${profile?.username ?? ""} на Sheira. Люди, услуги, события`

  return {
    title: title,
    keywords: [...keyWords],
    description: profile?.about ?? `Пользователь ${profile?.username}`,
    openGraph: {
      title: title,
      description: profile?.about ?? `Пользователь ${profile?.username}`,
      images: profile?.image?.attributes?.url || "/icons/icon.png",
    },
    twitter: {
      title: title,
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

  const { profile } = data ?? {}
  const { firstName, lastName, image, about } = profile ?? {}

  const schemaORG = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${firstName ?? "Имя"} ${lastName}`,
    image: image?.attributes?.url,
    jobTitle: about ?? "Предоставление услуг",
    url: `${env.server.host}/customer/${id}`,
    /** TODO: добавить ссылки на соцсети */
    sameAs: ["https://t.me/sheirapeople", "https://t.me/sheira_ru", "https://t.me/sheirainfo"],
    worksFor: {
      "@type": "Organization",
      name: "Sheira",
    },
    description: about ?? "Предоставление услуг",
  })

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
      <Script
        id={`schema-customer-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaORG,
        }}
      />
    </>
  )
}
