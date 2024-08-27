"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

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

import { useResize } from "@/helpers"
import { dispatchUTMData, IStateUTM, useAuth } from "@/store"

export default () => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const isAuth = useAuth(({ isAuth }) => isAuth)
  const { isTablet } = useResize()

  const utm_source = searchParams.get("utm_source")
  const utm_medium = searchParams.get("utm_medium")
  const utm_campaign = searchParams.get("utm_campaign")
  const utm_content = searchParams.get("utm_content")

  useEffect(() => {
    if (utm_source || utm_medium || utm_campaign || utm_content) {
      setTimeout(() => {
        const data: IStateUTM = {}

        if (utm_source) {
          data.utm_source = utm_source
        }
        if (utm_medium) {
          data.utm_medium = utm_medium
        }
        if (utm_campaign) {
          data.utm_campaign = utm_campaign
        }
        if (utm_content) {
          data.utm_content = utm_content
        }

        if (Object.values(data).length) {
          dispatchUTMData(data)
          replace("/")
        }
      })
    }
  }, [])

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
