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
const BannerServices = dynamic(() => import("@/components/content/BannerServices"), {
  ssr: false,
})
const YandexMap = dynamic(() => import("../components/YandexMap"), {
  ssr: false,
  loading: () => <div className="--loader--empty-screen--" />,
})
const SearchCategory = dynamic(() => import("@/components/content/mobile/SearchCategory"), {
  ssr: false,
})

import { useAuth } from "@/store"
import { useResize } from "@/helpers"
import { useEffect } from "react"

export default function Home() {
  const isAuth = useAuth(({ isAuth }) => isAuth)

  const { isTablet } = useResize()

  return (
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
  )
}
