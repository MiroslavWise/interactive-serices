"use client"

import { cx } from "@/lib/cx"
import { useMemo, useState } from "react"
import { useSwipeable } from "react-swipeable"

import { ImageCategory } from "@/components/common"
import type { IResponseOffersCategories } from "@/services/offers-categories/types"

import { useMobileFilterButton, dispatchVisibleFilterMobileButton } from "@/store"

import styles from "./styles/style.module.scss"
import { useQuery } from "@tanstack/react-query"
import { getOffersCategories } from "@/services"

export const MobileFiltersMap = () => {
  const visible = useMobileFilterButton(({ visible }) => visible)
  const { data: c } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = c?.res || []
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
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible} onClick={() => dispatchVisibleFilterMobileButton(false)}>
      <section
        {...handlers}
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        <h3>Выберите услуги, которые хотите видеть на карте</h3>
        <input
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="Введите интересующую вас категорию"
        />
        <ul>
          {categoriesMain.map((item) => (
            <li
              key={item.id + "-li-category"}
              onClick={(event) => {
                event.stopPropagation()
              }}
            >
              <ImageCategory id={item.id} />
              <p>{item.title}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
