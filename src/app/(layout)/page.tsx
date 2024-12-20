"use client"

import dynamic from "next/dynamic"

const Clusters = dynamic(() => import("@/components/YandexMap/Clusters"), { ssr: false })
const BannerSign = dynamic(() => import("@/components/content/BannerSign"), { ssr: false })
const ContextMap = dynamic(() => import("@/components/YandexMap/ContextMap"), { ssr: false })
const BannerServices = dynamic(() => import("@/components/content/BannerServices"), { ssr: false })

import { EStatusAuth } from "@/store"
import { useResize } from "@/helpers"
import env from "@/config/environment"
import { useStatusAuth } from "@/helpers/use-status-auth"

export default () => {
  const statusAuth = useStatusAuth()
  const { isTablet } = useResize()

  return (
    <>
      <main className="relative flex flex-col items-center justify-between h-full w-full overflow-hidden bg-transparent z-20">
        {statusAuth === EStatusAuth.AUTHORIZED && !isTablet && <BannerSign />}
        {isTablet ? (
          <></>
        ) : (
          <>
            <BannerServices />
          </>
        )}
        <ContextMap>
          <Clusters />
        </ContextMap>
      </main>
      <div
        itemScope
        itemType="https://schema.org/WebPage"
        className="fixed -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 max-w-96 opacity-0"
      >
        <meta itemProp="serviceType" content="Услуги, активность, обсуждения и срочные сообщения" />
        <h1 itemProp="name">Sheira. Люди, события, услуги</h1>
        <p itemProp="description">
          Sheira - сервис с интерактивной картой городов. Обычные люди размещают здесь свои услуги для обмена и продажи, обсуждают важные
          вопросы и сообщают о локальных проблемах.
        </p>
        <a itemProp="url" href={env.server.host} />
      </div>
    </>
  )
}
