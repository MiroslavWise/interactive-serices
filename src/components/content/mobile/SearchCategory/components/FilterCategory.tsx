import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import Button from "@/components/common/Button"
import IconHelp from "@/components/icons/IconHelp"
import { ImageCategory } from "@/components/common"
import { IconXClose } from "@/components/icons/IconXClose"

import { cx } from "@/lib/cx"
import { getOffersCategories } from "@/services"
import { dispatchActiveFilterScreen, dispatchDataFilterScreen, useFiltersScreen } from "@/store"

import styles from "../styles/filter-category.module.scss"

export default function FilterCategory() {
  const visible = useFiltersScreen(({ visible }) => visible)
  const activeFilters = useFiltersScreen(({ activeFilters }) => activeFilters)
  const [state, setState] = useState(activeFilters || [])
  const { data } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = data?.data || []

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
    <div
      className={cx(
        styles.wrapper,
        "absolute bg-BG-second top-4 left-0 right-0 flex flex-col",
        visible ? "z-[92] opacity-100 visible" : "-z-10 opacity-0 invisible",
      )}
    >
      <header className="w-full px-5 flex flex-row justify-between items-center gap-2.5 pb-2.5">
        <h3 className="text-text-primary text-xl font-semibold">Выбрать категории услуг</h3>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            dispatchActiveFilterScreen(false)
          }}
          className="w-12 h-12 p-6 relative rounded-full border border-solid border-grey-stroke-light bg-BG-second *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5"
        >
          <IconXClose />
        </button>
      </header>
      <section className="w-full overflow-x-hidden overflow-y-auto pt-2.5 pb-5">
        <div data-grid className="w-full px-5 h-fit grid gap-3 grid-cols-2">
          {mainCategories.map((item) => (
            <a
              key={`::item::category::filter::${item.id}::`}
              data-active={state?.some((some) => some === item.id)}
              onClick={(event) => {
                event.stopPropagation()
                handleCategory(item.id)
              }}
              className={cx(
                "flex flex-col items-start justify-between h-24 w-full p-3 rounded-xl border-grey-stroke-light border-solid cursor-pointer",
                state.some((some) => some === item.id) ? "border-none bg-gradient-to-r from-[#8b89f5] to-[#625ff9]" : "border bg-BG-second",
                item?.slug === "kursk" &&
                  `border border-[var(--border-red)] [background:var(--linear-red-help-opacity)] hover:border-[var(--border-red-contrast)]`,
                state.some((some) => some === item.id) && item?.slug === "kursk" && `border-none [background:var(--more-red-gradient)]`,
              )}
            >
              <div className="relative w-6 h-6 bg-transparent p-3 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-6 *:h-6">
                {item?.slug === "kursk" && state.some((some) => some === item.id) ? (
                  <IconHelp />
                ) : (
                  <ImageCategory id={item.id} slug={item?.slug} provider={item?.provider} />
                )}
              </div>
              <p className="text-text-primary text-sm font-normal line-clamp-2 text-ellipsis">{item.title}</p>
            </a>
          ))}
        </div>
      </section>
      <footer className="w-full px-5 pt-2.5 pb-5 flex flex-row gap-3 *:h-11 *:rounded-[1.375rem]">
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
