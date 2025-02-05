/**
 *
 * @default version 3
 * @author @MiroslavWise
 * @description Версия 3.0.0
 * @date 2024-12-27
 * @version 3.0.0
 *
 */

"use client"

import dynamic from "next/dynamic"

import FormProviderSearch from "./components/FormProviderSearch"
const SpriteMap = dynamic(() => import("@/components/icons/icon-sprite-map"))
const HeaderMap = dynamic(() => import("@/components/YandexMap/HeaderMap"), { ssr: false })
const ContextMap = dynamic(() => import("@/components/YandexMap/ContextMap"), { ssr: false })
import { MobileFilterMap, ButtonCollapseServices, FiltersScreen } from "@/components/content"
const BannerSearch = dynamic(() => import("@/components/content/BannerSearch"), { ssr: false })
const AllClusters = dynamic(() => import("@/components/YandexMap/AllClusters"), { ssr: false })
const MapSearch = dynamic(() => import("@/components/content/mobile/MapSearch"), { ssr: false })
const Navigation = dynamic(() => import("@/components/content/mobile/Navigation"), { ssr: false })
const BannerServices = dynamic(() => import("@/components/content/BannerServices"), { ssr: false })
const SearchAndFilters = dynamic(() => import("@/components/content/SearchAndFilters"), { ssr: false })
const SearchCategory = dynamic(() => import("@/components/content/mobile/SearchCategory"), { ssr: false })
const ButtonNavigation = dynamic(() => import("@/components/content/BannerSign/components/ButtonNavigation"), { ssr: false })

import { useResize } from "@/helpers"
import useUtm from "@/helpers/use-utm"

export default () => {
  useUtm()
  const { isTablet } = useResize()

  return (
    <>
      <main className="relative flex flex-col items-center justify-between h-full w-full overflow-hidden bg-transparent z-20">
        <HeaderMap />
        <FormProviderSearch>
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
            <AllClusters />
          </ContextMap>
        </FormProviderSearch>
      </main>
      <SpriteMap />
    </>
  )
}
