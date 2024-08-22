"use client"

import { useCallback, useRef } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"
import { type TServicesFilter } from "./types/types"

import TimesFilter from "./components/TimesFilter"
import { ImageCategory } from "@/components/common"
import { ServicesComponent } from "./components/Services"
import { IconSearch } from "@/components/icons/IconSearch"
import { IconXClose } from "@/components/icons/IconXClose"
import { IconFilters } from "@/components/icons/IconFilters"

import { SERVICES } from "./constants"
import {
  dispatchActiveFilterScreen,
  dispatchCollapseServices,
  dispatchDataFilterScreen,
  dispatchFiltersServiceProvider,
  dispatchValueSearchFilters,
  dispatchVisibleSearchFilters,
  useBanner,
  useCollapseServices,
  useFiltersScreen,
  useFiltersServices,
  useSearchFilters,
} from "@/store"
import { cx } from "@/lib/cx"
import { getOffersCategories } from "@/services"

import styles from "./styles/style.module.scss"

function BannerServices() {
  const visible = useCollapseServices(({ visible }) => visible)
  const providers = useFiltersServices(({ providers }) => providers)
  const activeFilters = useFiltersScreen(({ activeFilters }) => activeFilters)
  const visibleBanner = useBanner(({ visible }) => visible)
  const { data } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = data?.res || []
  const parentRef = useRef<HTMLUListElement>(null)

  function handleProvider(value: TServicesFilter) {
    dispatchFiltersServiceProvider(value)
  }

  function deleteCategories(id: number) {
    dispatchDataFilterScreen(activeFilters?.filter((item) => item !== id))
  }

  const itemCategory = useCallback((id: number) => categories.find((item) => item.id === id), [categories])

  return (
    <div
      className={cx(
        styles.container,
        "max-md:hidden fixed right-0 max-w-[var(--width-right-services)] w-full bg-BG-second z-[60] overflow-hidden rounded-[2rem]",
        visible ? "translate-x-[var(--width-right-services)]" : "-translate-x-6",
        visibleBanner
          ? "top-[calc(var(--height-header-nav-bar)_+_1.5rem_+_2.75rem)] h-[calc(100%_-_var(--height-header-nav-bar)_-_3rem_-_2.75rem)]"
          : "top-[calc(var(--height-header-nav-bar)_+_1.5rem)] h-[calc(100%_-_var(--height-header-nav-bar)_-_3rem)]",
      )}
      data-test="banner-services"
    >
      <header className="w-full h-[4.875rem] sticky top-0" />
      <ul ref={parentRef} data-test="ul-banner-services" className="relative w-full h-[calc(100%_-_4.875rem)] overflow-y-auto">
        <section data-test="ul-section-banner-services" className="w-full flex flex-col gap-[1.125rem] py-2.5 px-5">
          <div data-filters-services className="gap-4 w-full flex flex-row items-start justify-start">
            {SERVICES.map((item) => (
              <a
                key={`::key::item::provider::${item.value}::`}
                data-active={providers === item.value}
                onClick={(event) => {
                  event.stopPropagation()
                  handleProvider(item.value)
                }}
                data-test={`services-a-banner-services-${item.value}`}
                className={cx(
                  "relative cursor-pointer",
                  providers === item.value ? "[&>span]:text-text-accent" : "[&>span]:text-text-secondary",
                )}
              >
                <span className="text-center text-sm font-medium">{item.label}</span>
              </a>
            ))}
          </div>
          <TimesFilter />
          {activeFilters.length && ["all", EnumTypeProvider.offer].includes(providers) ? (
            <div data-filters-category data-test="filters-category-banner-services" className="w-full flex flex-row items-start">
              {activeFilters.map((item) => (
                <a key={`::key::item::filter::category::${item}::`} data-test={`a-filters-category-banner-service-${item}`}>
                  <div data-icon>
                    <ImageCategory id={item} />
                  </div>
                  <span>{itemCategory(item) ? itemCategory(item)?.title : null}</span>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      deleteCategories(item)
                    }}
                  >
                    <IconXClose />
                  </button>
                </a>
              ))}
            </div>
          ) : null}
        </section>
        <div data-test="ul-section-container-banner-services" className="flex flex-col items-start gap-4 pt-1.5 px-5 pb-5">
          <ServicesComponent />
        </div>
      </ul>
    </div>
  )
}

BannerServices.displayName = "BannerServices"
export default BannerServices

export const SearchAndFilters = () => {
  const visible = useCollapseServices(({ visible }) => visible)
  const value = useSearchFilters(({ value }) => value)
  const visibleBanner = useBanner(({ visible }) => visible)

  return (
    <div
      className={cx(
        styles.containerSearchAndFilters,
        "fixed flex flex-row items-center gap-2.5 right-0",
        visibleBanner
          ? "top-[calc(var(--height-header-nav-bar)_+_2.75rem_+_2.75rem)]"
          : "top-[calc(var(--height-header-nav-bar)_+_2.75rem)]",
      )}
      data-collapse={visible}
      data-test="search-and-filters"
    >
      <div data-search>
        <span data-icon-search>
          <IconSearch />
        </span>
        <input
          type="text"
          placeholder="Что Вы ищете"
          readOnly
          value={value}
          onClick={(event) => {
            event.stopPropagation()
            dispatchVisibleSearchFilters(true)
          }}
          data-test="input-search-and-filters"
        />
        {!!value ? (
          <button
            type="button"
            data-icon-close
            onClick={(event) => {
              event.stopPropagation()
              dispatchValueSearchFilters("", null)
            }}
            data-test="button-search-and-filters-on-clear"
          >
            <IconXClose />
          </button>
        ) : null}
      </div>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          dispatchActiveFilterScreen(true)
        }}
        data-test="button-search-and-filters-on-close"
      >
        <IconFilters />
      </button>
    </div>
  )
}

export const ButtonCollapseServices = () => {
  const visible = useCollapseServices(({ visible }) => visible)
  const visibleBanner = useBanner(({ visible }) => visible)

  return (
    <button
      data-collapse={visible}
      className={cx(
        styles.buttonCollapse,
        "fixed right-0 w-8 h-8 rounded-full p-2.5 flex items-center justify-center bg-BG-second",
        visibleBanner
          ? "top-[calc(var(--height-header-nav-bar)_+_1.5rem_+_1.75rem_+_2.75rem)]"
          : "top-[calc(var(--height-header-nav-bar)_+_1.5rem_+_1.75rem)]",
      )}
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        dispatchCollapseServices()
      }}
      data-test="button-collapse-services"
    >
      <img src="/svg/chevron-right-accent.svg" alt="right" width={12} height={12} />
    </button>
  )
}

export * from "./components/FiltersScreen"
export * from "./components/SearchFilters"
