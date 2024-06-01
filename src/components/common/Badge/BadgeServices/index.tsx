"use client"

import { useQuery } from "@tanstack/react-query"

import type { TBadgeServices } from "./types"

import { IconCategory } from "@/lib/icon-set"

import { getOffersCategories } from "@/services"

import styles from "./style.module.scss"

export const BadgeServices: TBadgeServices = (props) => {
  const { categoryId, id, isClickable } = props ?? {}

  const { data } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = data?.res || []

  const infoCategory = categories?.find((item) => item?.id === categoryId)

  function handle() {
    if (id && isClickable) {
      const { isClickable, ...offer } = props ?? {}
    }
  }

  return (
    <li className={styles.container} onClick={handle}>
      <div data-img>
        <img
          src={IconCategory(categoryId!)}
          alt="cat"
          height={16}
          width={16}
          onError={(error: any) => {
            if (error?.target) {
              try {
                error.target.src = `/svg/category/default.svg`
              } catch (e) {
                console.log("catch e: ", e)
              }
            }
          }}
        />
      </div>
      <p>{infoCategory?.title! || "---{}---"}</p>
    </li>
  )
}
