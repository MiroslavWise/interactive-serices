"use client"

import dynamic from "next/dynamic"
import { useCallback, useRef, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"
import { TServicesFilter } from "../../BannerServices/types/types"

import { ImageCategory } from "@/components/common"
import { IconXClose } from "@/components/icons/IconXClose"
import { IconSearch } from "@/components/icons/IconSearch"
import { IconFilters } from "@/components/icons/IconFilters"
import IconDoubleChevronsUp from "@/components/icons/IconDoubleChevronsUp"
const FilterCategory = dynamic(() => import("./components/FilterCategory"))

import { ServicesMobile } from "./components/Services"
import { EnumTimesFilter, SERVICES, TIMES } from "../../BannerServices/constants"

import {
  useFiltersScreen,
  useFiltersServices,
  useMobileSearchCategory,
  dispatchDataFilterScreen,
  dispatchFiltersServiceTime,
  dispatchActiveFilterScreen,
  dispatchFiltersServiceProvider,
  dispatchMobileSearchCategoryVisible,
} from "@/store"
import { getOffersCategories } from "@/services"

import styles from "./styles/style.module.scss"
import { cx } from "@/lib/cx"
import TimesFilter from "../../BannerServices/components/TimesFilter"
import ActiveFilters from "./components/ActiveFilters"

export default function SearchCategory() {
  const visible = useMobileSearchCategory(({ visible }) => visible)
  const providers = useFiltersServices(({ providers }) => providers)
  const activeFilters = useFiltersScreen(({ activeFilters }) => activeFilters)
  const parentRef = useRef<HTMLUListElement>(null)
  const visibleFilter = useFiltersScreen(({ visible }) => visible)
  const [input, setInput] = useState("")

  function handleProvider(value: TServicesFilter) {
    dispatchFiltersServiceProvider(value)
  }

  const reversOpen = () => dispatchMobileSearchCategoryVisible(!visible)

  return (
    <div
      className={cx(
        styles.container,
        "w-full fixed z-[90] h-full rounded-t-3xl bg-BG-second inset-0",
        visible ? " translate-y-[1.625rem]" : "translate-y-[calc(100%_-_var(--height-mobile-footer-nav)_-_6rem)]",
      )}
    >
      <button
        type="button"
        title={visible ? "Закрыть" : "Открыть"}
        aria-label={visible ? "Закрыть" : "Открыть"}
        aria-labelledby={visible ? "Закрыть" : "Открыть"}
        onClick={reversOpen}
        className={cx(
          "absolute z-[91] left-1/2 top-0 p-2 rounded-full w-10 h-10 border-none outline-none flex items-center justify-center bg-BG-second",
          "*:aspect-square *:w-5 *:h-5",
          visible && "*:!rotate-180",
        )}
      >
        <IconDoubleChevronsUp />
      </button>
      {visibleFilter ? <FilterCategory /> : null}
      <header className="p-5 pt-6 flex flex-row gap-2.5 cursor-pointer w-full h-24 relative">
        <div data-search className="relative h-12 w-full">
          <input
            type="text"
            onClick={(event) => {
              event.stopPropagation()
              dispatchMobileSearchCategoryVisible(true)
            }}
            value={input}
            onChange={(event) => setInput(event.target.value || "")}
            placeholder="Что Вы ищете"
            className="h-3 rounded-3xl !pl-[2.625rem]"
          />
          <div className={cx("absolute w-5 h-5 left-3.5 top-1/2 -translate-y-1/2 pointer-events-none", "*:w-5 *:h-5")}>
            <IconSearch />
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              setInput("")
            }}
            title="Очистить поле ввода"
            aria-label="Очистить поле ввода"
            className={cx(
              "absolute h-9 w-9 top-1/2 -translate-y-1/2 r-3.5 p-2.5 items-center justify-center bg-transparent border-none outline-none",
              !!input?.trim() ? "flex" : "hidden",
              "*:w-4 *:h-4",
            )}
          >
            <IconXClose />
          </button>
        </div>
        <button
          type="button"
          data-filter
          className={cx(
            "w-12 h-12 p-6 relative rounded-full border border-solid border-grey-stroke bg-BG-second",
            "*:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5 *:z-[2]",
          )}
          onClick={(event) => {
            event.stopPropagation()
            dispatchActiveFilterScreen(true)
            dispatchMobileSearchCategoryVisible(true)
          }}
        >
          <IconFilters />
        </button>
      </header>
      <section className="w-full h-[calc(100%_-_6rem)] overflow-x-hidden overflow-y-auto" ref={parentRef}>
        <article className={cx("w-full flex flex-col gap-[1.125rem] py-2.5 px-5", "*:flex *:w-full *:flex-row *:items-start")}>
          <div data-filters-services className="justify-start gap-4">
            {SERVICES.map((item) => (
              <a
                key={`::key::item::provider::${item.value}::`}
                data-active={providers === item.value}
                onClick={(event) => {
                  event.stopPropagation()
                  handleProvider(item.value)
                }}
                className={cx(
                  "relative cursor-pointer",
                  providers === item.value ? "[&>span]:text-text-accent" : "[&>span]:text-text-secondary",
                )}
              >
                <span className="text-center text-sm font-medium">{item.label.replace("Все сервисы", "Все")}</span>
              </a>
            ))}
          </div>
          <TimesFilter />
          {activeFilters.length && ["all", EnumTypeProvider.offer].includes(providers) ? (
            <ActiveFilters activeFilters={activeFilters} />
          ) : null}
        </article>
        <ServicesMobile input={input} parentRef={parentRef} />
      </section>
    </div>
  )
}
