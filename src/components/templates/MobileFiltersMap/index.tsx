"use client"

import { cx } from "@/lib/cx"
import { useMemo, useState } from "react"
import { useSwipeable } from "react-swipeable"

import type { IResponseOffersCategories } from "@/services/offers-categories/types"

import {
  useFilterMap,
  useOffersCategories,
  useMobileFilterButton,
  dispatchVisibleFilterMobileButton,
  dispatchFilterMap,
} from "@/store/hooks"
import { IconCategory } from "@/lib/icon-set"

import styles from "./styles/style.module.scss"

export const MobileFiltersMap = () => {
  const visible = useMobileFilterButton(({ visible }) => visible)
  const idsNumber = useFilterMap(({ idsNumber }) => idsNumber)
  const categories = useOffersCategories(({ categories }) => categories)
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
              data-active={idsNumber.includes(item.id)}
              onClick={(event) => {
                event.stopPropagation()
                dispatchFilterMap(item.id)
              }}
            >
              <img
                data-icon
                src={IconCategory(item.id)}
                alt="icon"
                width={28}
                height={28}
                onError={(error: any) => {
                  if (error?.target) {
                    try {
                      error.target.src = IconCategory(item.id)
                    } catch (e) {
                      console.log("catch e: ", e)
                    }
                  }
                }}
              />
              <p>{item.title}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
