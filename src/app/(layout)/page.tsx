"use client"

import dynamic from "next/dynamic"
import { YMaps } from "@pbe/react-yandex-maps"

import MapSearch from "@/components/content/mobile/MapSearch"
import Navigation from "@/components/content/mobile/Navigation"
import { SearchAndFilters } from "@/components/content/SearchAndFilters"
import { MobileFilterMap, ButtonCollapseServices, FiltersScreen } from "@/components/content"

const YandexMap = dynamic(() => import("../../components/YandexMap"), {
  ssr: false,
  loading: () => <div className="--loader--empty-screen--" />,
})
const BannerSign = dynamic(() => import("@/components/content/BannerSign"))
const BannerSearch = dynamic(() => import("@/components/content/BannerSearch"))
const BannerServices = dynamic(() => import("@/components/content/BannerServices"))
const SearchCategory = dynamic(() => import("@/components/content/mobile/SearchCategory"))
import { ButtonNavigation } from "@/components/content/BannerSign/components/ButtonNavigation"

import { EStatusAuth } from "@/store"
import { useResize } from "@/helpers"
import useUtm from "@/helpers/use-utm"
import env from "@/config/environment"
import { useStatusAuth } from "@/helpers/use-status-auth"

export default () => {
  useUtm()
  const statusAuth = useStatusAuth()
  const { isTablet } = useResize()

  return (
    <>
      <main className="relative flex flex-col items-center justify-between h-full w-full overflow-hidden bg-transparent z-20">
        <YMaps
          query={{
            apikey: env.api_key_yandex,
            lang: "ru_RU",
            coordorder: "longlat",
            mode: "release",
          }}
          preload={true}
        >
          <YandexMap />
        </YMaps>
        {statusAuth === EStatusAuth.AUTHORIZED && !isTablet && <BannerSign />}
        {isTablet ? (
          <>
            <MobileFilterMap />
            <MapSearch />
            <Navigation />
            <SearchCategory />
          </>
        ) : (
          <>
            <ButtonNavigation />
            <BannerSearch />
            <FiltersScreen />
            <SearchAndFilters />
            <BannerServices />
            <ButtonCollapseServices />
          </>
        )}
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
