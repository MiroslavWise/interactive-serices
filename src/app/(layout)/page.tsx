/**
 *
 * VERSION MAP 3.0
 * @default version 3
 *
 */

"use client"

import dynamic from "next/dynamic"

const HeaderMap = dynamic(() => import("@/components/YandexMap/Header"), { ssr: false })
const Clusters = dynamic(() => import("@/components/YandexMap/Clusters"), { ssr: false })
const BannerSign = dynamic(() => import("@/components/content/BannerSign"), { ssr: false })
const ContextMap = dynamic(() => import("@/components/YandexMap/ContextMap"), { ssr: false })
import { MobileFilterMap, ButtonCollapseServices, FiltersScreen } from "@/components/content"
const BannerSearch = dynamic(() => import("@/components/content/BannerSearch"), { ssr: false })
const MarkerPosts = dynamic(() => import("@/components/YandexMap/MarkerPosts"), { ssr: false })
const MapSearch = dynamic(() => import("@/components/content/mobile/MapSearch"), { ssr: false })
const Navigation = dynamic(() => import("@/components/content/mobile/Navigation"), { ssr: false })
const BannerServices = dynamic(() => import("@/components/content/BannerServices"), { ssr: false })
const SearchAndFilters = dynamic(() => import("@/components/content/SearchAndFilters"), { ssr: false })
const SearchCategory = dynamic(() => import("@/components/content/mobile/SearchCategory"), { ssr: false })
const ButtonNavigation = dynamic(() => import("@/components/content/BannerSign/components/ButtonNavigation"), { ssr: false })

import { EStatusAuth } from "@/store"
import { useResize } from "@/helpers"
import env from "@/config/environment"
import useUtm from "@/helpers/use-utm"
import { useStatusAuth } from "@/helpers/use-status-auth"

export default () => {
  useUtm()
  const statusAuth = useStatusAuth()
  const { isTablet } = useResize()

  return (
    <>
      <main className="relative flex flex-col items-center justify-between h-full w-full overflow-hidden bg-transparent z-20">
        <HeaderMap />
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
        <ContextMap>
          <MarkerPosts />
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
          Сервис с интерактивной картой города. Можно размещать свои услуги, проводить активности, общаться и помогать друг другу
        </p>
        <a itemProp="url" href={env.server.host} />
      </div>
    </>
  )
}
