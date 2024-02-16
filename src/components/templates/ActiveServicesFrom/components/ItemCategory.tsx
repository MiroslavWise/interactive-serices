"use client"

import { memo, useState } from "react"

import type { IResponseOffersCategories } from "@/services/offers-categories/types"

import { useAuth } from "@/store"
import { patchUser } from "@/services"
import { IconCategory } from "@/lib/icon-set"

import styles from "../styles/item.module.scss"

export const ItemCategory = memo(function ItemCategory(
  props: IResponseOffersCategories & { refetch(): Promise<any>; categories: IResponseOffersCategories[] },
) {
  const userId = useAuth(({ userId }) => userId)
  const { id, title, categories = [], refetch } = props ?? {}
  const [loading, setLoading] = useState(false)

  function deleteCategory() {
    if (!loading) {
      setLoading(true)
      const filter = categories.filter((item) => item.id !== id)
      patchUser({ categories: filter.map((item) => item.id) }, userId!).then((response) => {
        if (response.ok) {
          refetch().then(() => setLoading(false))
        } else {
          setLoading(false)
        }
      })
    }
  }

  return (
    <li className={styles.container}>
      <header>
        <div data-img>
          <img
            src={IconCategory(id)}
            alt={`${id!}`}
            width={18}
            height={18}
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
        <button onClick={deleteCategory}>
          <img src="/svg/x-close.svg" alt={"x"} width={16} height={16} />
        </button>
      </header>
      <p>{title}</p>
    </li>
  )
})
