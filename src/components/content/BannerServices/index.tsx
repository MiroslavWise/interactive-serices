"use client"

import { useCallback, useRef, useState } from "react"
import { isMobile } from "react-device-detect"

import { TServicesFilter } from "./types/types"
import { EnumTypeProvider } from "@/types/enum"

import { ImageCategory } from "@/components/common"
import { ServicesComponent } from "./components/Services"
import { IconSearch } from "@/components/icons/IconSearch"
import { IconXClose } from "@/components/icons/IconXClose"
import { IconFilters } from "@/components/icons/IconFilters"

import { EnumTimesFilter, SERVICES, TIMES } from "./constants"
import {
  dispatchActiveFilterScreen,
  dispatchCollapseServices,
  dispatchDataFilterScreen,
  dispatchFiltersServiceProvider,
  dispatchFiltersServiceTime,
  useCollapseServices,
  useFiltersScreen,
  useFiltersServices,
  useOffersCategories,
} from "@/store"

import styles from "./styles/style.module.scss"

export const BannerServices = () => {
  const visible = useCollapseServices(({ visible }) => visible)
  const providers = useFiltersServices(({ providers }) => providers)
  const timesFilter = useFiltersServices(({ timesFilter }) => timesFilter)
  const activeFilters = useFiltersScreen(({ activeFilters }) => activeFilters)
  const categories = useOffersCategories(({ categories }) => categories)
  const [total, setTotal] = useState(0)
  const parentRef = useRef<HTMLUListElement>(null)

  function handleProvider(value: TServicesFilter) {
    dispatchFiltersServiceProvider(value)
  }

  function handleTimeFilter(value: EnumTimesFilter) {
    dispatchFiltersServiceTime(value)
  }

  function deleteCategories(id: number) {
    dispatchDataFilterScreen(activeFilters?.filter((item) => item !== id))
  }

  const itemCategory = useCallback((id: number) => categories.find((item) => item.id === id), [categories])

  return !isMobile ? (
    <div className={styles.container} data-collapse={visible}>
      <header />
      <ul ref={parentRef}>
        <section>
          <div data-filters-services>
            {SERVICES.map((item) => (
              <a
                key={`::key::item::provider::${item.value}::`}
                data-active={providers === item.value}
                onClick={(event) => {
                  event.stopPropagation()
                  handleProvider(item.value)
                }}
              >
                <span>{item.label}</span>
              </a>
            ))}
          </div>
          <div data-filters-times>
            {TIMES.map((item) => (
              <a
                key={`::key::item::time::${item.value}::`}
                data-active={timesFilter === item.value}
                onClick={(event) => {
                  event.stopPropagation()
                  handleTimeFilter(item.value)
                }}
              >
                <span>{item.label}</span>
              </a>
            ))}
          </div>
          {activeFilters.length && ["all", EnumTypeProvider.offer].includes(providers) ? (
            <div data-filters-category>
              {activeFilters.map((item) => (
                <a key={`::key::item::filter::category::${item}::`}>
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
        <div data-container>
          <ServicesComponent setTotal={setTotal} />
        </div>
      </ul>
    </div>
  ) : null
}

export const SearchAndFilters = () => {
  const visible = useCollapseServices(({ visible }) => visible)

  return (
    <div className={styles.containerSearchAndFilters} data-collapse={visible}>
      <div data-search>
        <span data-icon-search>
          <IconSearch />
        </span>
        <input type="text" placeholder="Что Вы ищете" />
      </div>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          dispatchActiveFilterScreen()
        }}
      >
        <IconFilters />
      </button>
    </div>
  )
}

export const ButtonCollapseServices = () => {
  const visible = useCollapseServices(({ visible }) => visible)

  return (
    <button
      data-collapse={visible}
      className={styles.buttonCollapse}
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        dispatchCollapseServices()
      }}
    >
      <img src="/svg/chevron-right-accent.svg" alt="right" width={12} height={12} />
    </button>
  )
}

export * from "./components/FiltersScreen"
