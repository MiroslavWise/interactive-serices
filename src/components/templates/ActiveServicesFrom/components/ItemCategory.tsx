"use client"

import { memo, useState } from "react"

import type { IResponseOffersCategories } from "@/services/offers-categories/types"

import { ImageCategory } from "@/components/common"
import { IconXClose } from "@/components/icons/IconXClose"

import { useAuth } from "@/store"
import { patchUser } from "@/services"

export const ItemCategory = memo(function ItemCategory(
  props: IResponseOffersCategories & { refetch(): Promise<any>; categories: IResponseOffersCategories[] },
) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { id, title, categories = [], refetch } = props ?? {}
  const [loading, setLoading] = useState(false)

  function deleteCategory() {
    if (!loading) {
      setLoading(true)
      const filter = categories.filter((item) => item.id !== id)
      patchUser({ categories: filter.map((item) => item.id) }, userId!).then((response) => {
        if (!!response.data) {
          refetch().then(() => setLoading(false))
        } else {
          setLoading(false)
        }
      })
    }
  }

  return (
    <li
      className="rounded-xl p-3 w-full h-[7.125rem] flex flex-col gap-3 justify-between items-start"
      data-test="li-modal-active-services-from"
      style={{
        background: "var(--more-blue-gradient)",
      }}
    >
      <header className="w-full flex flex-row items-start justify-between">
        <div className="w-6 h-6 p-3 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-6 *:h-6">
          <ImageCategory id={id} />
        </div>
        <button
          onClick={deleteCategory}
          data-test="li-button-modal-active-services-from-on-delete"
          className="bg-transparent border-none outline-none w-4 h-4 p-2 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4 *:opacity-60 [&>svg>path]:stroke-text-button"
        >
          <IconXClose />
        </button>
      </header>
      <p className="text-text-button text-sm font-normal line-clamp-3 text-ellipsis">{title}</p>
    </li>
  )
})
