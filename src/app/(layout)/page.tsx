"use client"

import dynamic from "next/dynamic"

import MapSearch from "@/components/content/mobile/MapSearch"
import Navigation from "@/components/content/mobile/Navigation"
import { MobileFilterMap, ButtonCollapseServices, SearchAndFilters, FiltersScreen, SearchFilters } from "@/components/content"

const BannerSign = dynamic(() => import("@/components/content/BannerSign"), {
  ssr: false,
})
const BannerServices = dynamic(() => import("@/components/content/BannerServices"), {
  ssr: false,
})
const YandexMap = dynamic(() => import("../../components/YandexMap"), {
  ssr: false,
  loading: () => <div className="--loader--empty-screen--" />,
})
const SearchCategory = dynamic(() => import("@/components/content/mobile/SearchCategory"), {
  ssr: false,
})
import { ButtonNavigation } from "@/components/content/BannerSign/components/ButtonNavigation"

import { EStatusAuth } from "@/store"
import { useResize } from "@/helpers"
import useUtm from "@/helpers/use-utm"
import { useStatusAuth } from "@/helpers/use-status-auth"

export default () => {
  useUtm()
  const statusAuth = useStatusAuth()
  const { isTablet } = useResize()

  return (
    <>
      <main className="relative flex flex-col items-center justify-between h-full w-full overflow-hidden bg-transparent z-20">
        <YandexMap />
        {statusAuth === EStatusAuth.AUTHORIZED && !isTablet && <BannerSign />}
        {/* {statusAuth === EStatusAuth.UNAUTHORIZED && <BannerAbout />} */}
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
            <SearchFilters />
            <FiltersScreen />
            <SearchAndFilters />
            <BannerServices />
            <ButtonCollapseServices />
          </>
        )}
      </main>
    </>
  )
}
