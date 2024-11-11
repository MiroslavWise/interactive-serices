"use client"

import dynamic from "next/dynamic"

import {
  BannerAbout,
  MobileFilterMap,
  BannerStartCreate,
  ButtonCollapseServices,
  SearchAndFilters,
  FiltersScreen,
  SearchFilters,
} from "@/components/content"
import MapSearch from "@/components/content/mobile/MapSearch"
import Navigation from "@/components/content/mobile/Navigation"

const BannerSign = dynamic(() => import("@/components/content/BannerSign"), {
  ssr: false,
})
const HasClustererBalloons = dynamic(() => import("@/components/templates/HasClustererBalloons"), {
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
const BannerMainPage = dynamic(() => import("@/components/content/BannerMainPage"), {
  ssr: false,
})

import { useAuth, useHasBalloons } from "@/store"
import { useResize } from "@/helpers"
import useUtm from "@/helpers/use-utm"

export default () => {
  useUtm()
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const { isTablet } = useResize()
  const visibleHasBalloon = useHasBalloons(({ visibleHasBalloon }) => visibleHasBalloon)

  return (
    <>
      <BannerMainPage />
      <main className="relative flex flex-col items-center justify-between h-full w-full overflow-hidden bg-transparent z-20">
        <YandexMap />
        {isAuth && !isTablet && <BannerSign />}
        {typeof isAuth !== "undefined" && !isAuth && <BannerAbout />}
        {isAuth && isTablet && <BannerStartCreate />}
        {isTablet ? (
          <>
            <MobileFilterMap />
            <MapSearch />
            <Navigation />
            <SearchCategory />
          </>
        ) : (
          <>
            <SearchFilters />
            <FiltersScreen />
            <SearchAndFilters />
            <BannerServices />
            <ButtonCollapseServices />
          </>
        )}
      </main>
      {visibleHasBalloon && <HasClustererBalloons />}
    </>
  )
}
