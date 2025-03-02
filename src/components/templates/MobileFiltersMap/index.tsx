"use client"

import { useMemo, useState } from "react"
import { useSwipeable } from "react-swipeable"
import { useQuery } from "@tanstack/react-query"

import { type IResponseOffersCategories } from "@/services/offers-categories/types"

import { ImageCategory } from "@/components/common"

import { cx } from "@/lib/cx"
import { getOffersCategories } from "@/services"
import { useMobileFilterButton, dispatchVisibleFilterMobileButton } from "@/store"

import styles from "./styles/style.module.scss"

export const MobileFiltersMap = () => {
  const visible = useMobileFilterButton(({ visible }) => visible)
  const { data: c } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = c?.data || []
  const [value, setValue] = useState("")

  const categoriesMain: IResponseOffersCategories[] = useMemo(() => {
    const array = Array.from(
      new Set(categories?.filter((item) => item?.title?.toLowerCase().includes(value?.toLowerCase())).map((item) => item.provider)),
    )
    const arrayMain = categories
      ?.filter((item) => item.provider === "main")
      ?.filter((item) => array.some((_) => _.includes(item.slug)) || item.title?.toLowerCase()?.includes(value?.toLowerCase()))

    return [...arrayMain]
  }, [categories, value])

  const handlers = useSwipeable({
    onSwipedDown(event) {
      if (event.deltaY > 250) {
        dispatchVisibleFilterMobileButton(false)
      }
    },
  })

  return (
    <div
      className={cx("wrapper-fixed", "bg-translucent flex flex-col justify-end", visible && "!z-[450]")}
      data-visible={visible}
      onClick={() => dispatchVisibleFilterMobileButton(false)}
    >
      <section
        {...handlers}
        onClick={(event) => {
          event.stopPropagation()
        }}
        className={cx(
          "transition-all h-fit pt-4 px-4 pb-0 w-full rounded-t-2 bg-BG-second flex flex-col items-center justify-start gap-6",
          visible ? " translate-y-0" : "translate-y-full",
        )}
      >
        <h3 className="text-text-primary text-xl text-center font-medium">Выберите услуги, которые хотите видеть на карте</h3>
        <input
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="Введите интересующую вас категорию"
          className="flex justify-start items-center p-2.5 h-11 rounded-[1.375rem] border border-solid border-grey-stroke-light bg-BG-first text-sm font-medium w-full placeholder:text-text-secondary"
        />
        <ul className="h-fit w-full flex flex-wrap gap-4 pb-6 overflow-y-auto">
          {categoriesMain.map((item) => (
            <li
              key={item.id + "-li-category"}
              onClick={(event) => {
                event.stopPropagation()
              }}
              className={cx(
                styles.li,
                "w-min h-[2.375rem] flex flex-row items-center gap-2.5 border border-solid border-grey-field bg-BG-second cursor-pointer transition-all",
              )}
            >
              <ImageCategory slug={item?.slug} provider={item?.provider} />
              <p className="text-text-primary text-sm text-left font-medium">{item.title}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
