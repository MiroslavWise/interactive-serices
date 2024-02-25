"use client"

import { useRef, useState } from "react"
import { isMobile } from "react-device-detect"

import { TServicesFilter } from "./types/types"

import { ServicesComponent } from "./components/Services"
import { IconSearch } from "@/components/icons/IconSearch"
import { IconFilters } from "@/components/icons/IconFilters"

import { EnumTimesFilter, SERVICES, TIMES } from "./constants"
import {
  dispatchCollapseServices,
  dispatchFiltersServiceProvider,
  dispatchFiltersServiceTime,
  useCollapseServices,
  useFiltersServices,
} from "@/store"

import styles from "./styles/style.module.scss"

export const BannerServices = () => {
  const visible = useCollapseServices(({ visible }) => visible)
  const providers = useFiltersServices(({ providers }) => providers)
  const timesFilter = useFiltersServices(({ timesFilter }) => timesFilter)
  const [total, setTotal] = useState(0)
  const parentRef = useRef<HTMLUListElement>(null)

  function handleProvider(value: TServicesFilter) {
    dispatchFiltersServiceProvider(value)
  }

  function handleTimeFilter(value: EnumTimesFilter) {
    dispatchFiltersServiceTime(value)
  }

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
      <button type="button">
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
