"use client"

import { useRef } from "react"

import TimesFilter from "./components/TimesFilter"
import ActiveFilters from "./components/ActiveFilters"
import ServiceFilters from "./components/ServiceFilters"
import { ServicesComponent } from "./components/Services"
import { IconSearch } from "@/components/icons/IconSearch"
import { IconXClose } from "@/components/icons/IconXClose"
import { IconFilters } from "@/components/icons/IconFilters"

import {
  dispatchActiveFilterScreen,
  dispatchCollapseServices,
  dispatchValueSearchFilters,
  dispatchVisibleSearchFilters,
  useBanner,
  useCollapseServices,
  useSearchFilters,
} from "@/store"
import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

function BannerServices() {
  const visible = useCollapseServices(({ visible }) => visible)
  const visibleBanner = useBanner(({ visible }) => visible)
  const parentRef = useRef<HTMLUListElement>(null)

  return (
    <div
      className={cx(
        styles.container,
        "bottom-internal-shadow",
        "max-md:hidden fixed right-0 max-w-[var(--width-right-services)] w-full bg-BG-second z-[60] overflow-hidden rounded-2",
        visible ? "translate-x-[var(--width-right-services)]" : "-translate-x-6",
        visibleBanner
          ? "top-[calc(var(--height-header-nav-bar)_+_1.5rem_+_var(--height-banner))] h-[calc(100%_-_var(--height-header-nav-bar)_-_3rem_-_var(--height-banner))]"
          : "top-[calc(var(--height-header-nav-bar)_+_1.5rem)] h-[calc(100%_-_var(--height-header-nav-bar)_-_3rem)]",
      )}
      data-test="banner-services"
    >
      <header className="w-full h-[4.875rem] sticky top-0" />
      <ul ref={parentRef} data-test="ul-banner-services" className="relative w-full h-[calc(100%_-_4.875rem)] overflow-y-auto">
        <section data-test="ul-section-banner-services" className="w-full flex flex-col gap-[1.125rem] py-2.5 px-5">
          <ServiceFilters />
          <TimesFilter />
          <ActiveFilters />
        </section>
        <div data-test="ul-section-container-banner-services" className="flex flex-col items-start gap-4 pt-1.5 px-5 pb-5">
          <ServicesComponent parentRef={parentRef} />
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
          ? "top-[calc(var(--height-header-nav-bar)_+_2.75rem_+_var(--height-banner))]"
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
          ? "top-[calc(var(--height-header-nav-bar)_+_1.5rem_+_1.75rem_+_var(--height-banner))]"
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
