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
import Navigation from "@/components/content/mobile/Navigation"
import MapSearch from "@/components/content/mobile/MapSearch"

const YMapsProvider = dynamic(() => import("@/context/YMapsProvider"), {
  ssr: false,
})
const BannerSign = dynamic(() => import("@/components/content/BannerSign"), {
  ssr: false,
})
const BannerServices = dynamic(() => import("@/components/content/BannerServices"), {
  ssr: false,
  suspense: true,
})
const YandexMap = dynamic(() => import("../components/YandexMap"), {
  ssr: false,
  suspense: true,
  loading: () => <div className="--loader--empty-screen--" />,
})
const SearchCategory = dynamic(() => import("@/components/content/mobile/SearchCategory"), {
  ssr: false,
  suspense: false,
})

import { useAuth } from "@/store"
import { useResize } from "@/helpers"

import styles from "@/scss/page.module.scss"

export default function Home() {
  const isAuth = useAuth(({ isAuth }) => isAuth)

  const { isTablet } = useResize()

  return (
    <YMapsProvider>
      <main className={styles.main}>
        <YandexMap />
        {isAuth && <BannerSign />}
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
    </YMapsProvider>
  )
}
