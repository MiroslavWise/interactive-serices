"use client"

import dynamic from "next/dynamic"
import { isMobile } from "react-device-detect"

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

import styles from "@/scss/page.module.scss"

export default function Home() {
  const isAuth = useAuth(({ isAuth }) => isAuth)

  return (
    <main className={styles.main}>
      <YandexMap />
      {isAuth && <BannerSign />}
      {typeof isAuth !== "undefined" && !isAuth && <BannerAbout />}
      {isAuth && isMobile && <BannerStartCreate />}
      {isMobile && (
        <>
          <MobileFilterMap />
          <MapSearch />
          <Navigation />
          <SearchCategory />
        </>
      )}
      {!isMobile && (
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
