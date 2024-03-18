"use client"

import { dispatchMobileSearchCategoryVisible, useMobileSearchCategory } from "@/store"

import { IconSearch } from "@/components/icons/IconSearch"
import { IconFilters } from "@/components/icons/IconFilters"

import { ServicesMobile } from "./components/Services"

import styles from "./styles/style.module.scss"

export default function SearchCategory() {
  const visible = useMobileSearchCategory(({ visible }) => visible)

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
      <section>
        <ServicesMobile />
      </section>
    </div>
  )
}
