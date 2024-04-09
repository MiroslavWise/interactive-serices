"use client"

import { useCallback } from "react"

import { EnumTypeProvider } from "@/types/enum"
import { TServicesFilter } from "../../BannerServices/types/types"

import { ImageCategory } from "@/components/common"
import { IconXClose } from "@/components/icons/IconXClose"
import { IconSearch } from "@/components/icons/IconSearch"
import { IconFilters } from "@/components/icons/IconFilters"

import { ServicesMobile } from "./components/Services"
import { EnumTimesFilter, SERVICES, TIMES } from "../../BannerServices/constants"

import {
  dispatchDataFilterScreen,
  dispatchFiltersServiceProvider,
  dispatchFiltersServiceTime,
  dispatchMobileSearchCategoryVisible,
  useFiltersScreen,
  useFiltersServices,
  useMobileSearchCategory,
  useOffersCategories,
} from "@/store"

import styles from "./styles/style.module.scss"

export default function SearchCategory() {
  const visible = useMobileSearchCategory(({ visible }) => visible)
  const providers = useFiltersServices(({ providers }) => providers)
  const timesFilter = useFiltersServices(({ timesFilter }) => timesFilter)
  const activeFilters = useFiltersScreen(({ activeFilters }) => activeFilters)
  const categories = useOffersCategories(({ categories }) => categories)

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

  return (
    <div className={styles.container} data-visible={visible}>
      <header>
        <button
          data-close
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            dispatchMobileSearchCategoryVisible(!visible)
          }}
        >
          <span />
        </button>
        <IconSearch />
        <input
          type="text"
          onClick={(event) => {
            dispatchMobileSearchCategoryVisible(true)
          }}
          placeholder="Что Вы ищете"
        />
        <button data-filter>
          <IconFilters />
        </button>
      </header>
      <article>
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
              <span>{item.label.replace("Все сервисы", "Все")}</span>
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
      </article>
      <section>
        <ServicesMobile />
      </section>
    </div>
  )
}
