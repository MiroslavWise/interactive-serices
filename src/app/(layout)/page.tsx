"use client"

import dynamic from "next/dynamic"

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
import { useStatusAuth } from "@/helpers/use-status-auth"

export default () => {
  useUtm()
  const statusAuth = useStatusAuth()
  const { isTablet } = useResize()

  return (
    <main className="relative flex flex-col items-center justify-between h-full w-full overflow-hidden bg-transparent z-20">
      <YandexMap />
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
  )
}
