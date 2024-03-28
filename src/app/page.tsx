"use client"

import dynamic from "next/dynamic"

import {
  BannerServices,
  BannerSign,
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

  const { isMobile, isTablet } = useResize()

  return (
    <main className={styles.main}>
      <YandexMap />
      {isAuth && <BannerSign />}
      {typeof isAuth !== "undefined" && !isAuth && <BannerAbout />}
      {isAuth && (isMobile || isTablet) && <BannerStartCreate />}
      {(isMobile || isTablet) && (
        <>
          <MobileFilterMap />
          <MapSearch />
          <Navigation />
          <SearchCategory />
        </>
      )}
      {!isMobile && !isTablet && (
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
