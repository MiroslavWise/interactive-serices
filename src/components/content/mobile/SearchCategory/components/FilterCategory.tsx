import { useMemo, useState } from "react"

import { IconXClose } from "@/components/icons/IconXClose"
import { Button, ImageCategory } from "@/components/common"

import { dispatchActiveFilterScreen, dispatchDataFilterScreen, useFiltersScreen, useOffersCategories } from "@/store"

import styles from "../styles/filter-category.module.scss"

export default function FilterCategory() {
  const visible = useFiltersScreen(({ visible }) => visible)
  const activeFilters = useFiltersScreen(({ activeFilters }) => activeFilters)
  const [state, setState] = useState(activeFilters || [])
  const categories = useOffersCategories(({ categories }) => categories)

  const mainCategories = useMemo(() => categories?.filter((item) => item?.provider === "main") || [], [categories])

  function handleCategory(id: number) {
    if (state?.some((item) => item === id)) {
      setState((prev) => [...prev.filter((item) => item !== id)])
    } else {
      setState((prev) => [...prev, id])
    }
  }

  function handleOk() {
    dispatchDataFilterScreen(state)
    dispatchActiveFilterScreen(false)
  }

  return (
    <div className={styles.wrapper} data-visible={visible}>
      <header>
        <h3>Выбрать категории услуг</h3>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            dispatchActiveFilterScreen(false)
          }}
        >
          <IconXClose />
        </button>
      </header>
      <section>
        <div data-grid>
          {mainCategories.map((item) => (
            <a
              key={`::item::category::filter::${item.id}::`}
              data-active={state?.some((some) => some === item.id)}
              onClick={(event) => {
                event.stopPropagation()
                handleCategory(item.id)
              }}
            >
              <div data-icon>
                <ImageCategory id={item.id} />
              </div>
              <p>{item.title}</p>
            </a>
          ))}
        </div>
      </section>
      <footer>
        <Button
          type="button"
          typeButton="fill-primary"
          label="Применить"
          onClick={(event) => {
            event.stopPropagation()
            handleOk()
          }}
        />
        <Button
          type="button"
          typeButton="regular-primary"
          label="Сбросить"
          onClick={(event) => {
            event.stopPropagation()
            dispatchDataFilterScreen([])
            setState([])
          }}
        />
      </footer>
    </div>
  )
}
