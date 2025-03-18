"use client"

import { useEffect, useRef } from "react"

import TimesFilter from "./components/TimesFilter"
import ActiveFilters from "./components/ActiveFilters"
import ServiceFilters from "./components/ServiceFilters"
import { ServicesComponent } from "./components/Services"

import { cx } from "@/lib/cx"
import { clg } from "@console"
import { useCollapseServices, dispatchCollapseServices } from "@/store"

import styles from "./styles/style.module.scss"
import sWrapper from "./styles/virtual.module.scss"

function BannerServices() {
  const visible = useCollapseServices(({ visible }) => visible)
  const refSection = useRef<HTMLDivElement>(null)
  const refDiv = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (refSection.current && refDiv.current) {
      const heightSection = refSection.current.clientHeight

      refDiv.current.style.setProperty("--h", `${heightSection / 16}rem`)
    }
  }, [])

  return (
    <div
      className={cx(
        styles.container,
        "bottom-internal-shadow",
        "max-md:hidden fixed right-0 max-w-[var(--width-right-services)] w-full bg-BG-second z-[60] overflow-hidden rounded-2",
        visible ? "translate-x-[var(--width-right-services)]" : "-translate-x-6",
        "top-[calc(var(--height-header-nav-bar)_+_1.5rem)] h-[calc(100%_-_var(--height-header-nav-bar)_-_3rem)]",
      )}
      data-test="banner-services"
    >
      <header className="w-full h-[4.875rem] sticky top-0" />
      <ul data-test="ul-banner-services" className="relative w-full h-[calc(100%_-_4.875rem)] overflow-y-auto">
        <section ref={refSection} data-test="ul-section-banner-services" className="w-full flex flex-col gap-[1.125rem] py-2.5 px-5">
          <ServiceFilters />
          <TimesFilter />
          <ActiveFilters />
        </section>
        <div
          ref={refDiv}
          data-test="ul-section-container-banner-services"
          className={cx(sWrapper.wrapper, "flex flex-col items-start gap-4 px-5")}
        >
          <ServicesComponent />
        </div>
      </ul>
    </div>
  )
}

BannerServices.displayName = "BannerServices"
export default BannerServices

export const ButtonCollapseServices = () => {
  const visible = useCollapseServices(({ visible }) => visible)

  return (
    <button
      data-collapse={visible}
      className={cx(
        styles.buttonCollapse,
        "fixed right-0 w-8 h-8 rounded-full p-2.5 flex items-center justify-center bg-BG-second",
        "top-[calc(var(--height-header-nav-bar)_+_1.5rem_+_1.75rem)]",
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
