"use client"

import { forwardRef, useMemo } from "react"

import { EnumTypeProvider } from "@/types/enum"
import type { TListOffersBarter } from "./types"

import { Button } from "../Forward"

import { useOffersCategories, openCreateOffers, dispatchModal, EModalData } from "@/store"

import styles from "./style.module.scss"

export const ListOffersBarter = forwardRef(function ListOffersBarter(props: TListOffersBarter) {
  const { items, active, onClick, ...rest } = props ?? {}
  const categories = useOffersCategories(({ categories }) => categories)

  const height = useMemo(() => {
    const length = items?.length || 70 + 32

    return 16 + length * 70 + (length - 1) * 8
  }, [items])

  function updateProfileOffers() {
    openCreateOffers(EnumTypeProvider.offer)
    dispatchModal(EModalData.CreateNewOptionModal)
  }

  return (
    <article className={styles.container} {...rest}>
      <ul style={{ height: height }}>
        {items?.map((item) => (
          <li
            key={`${item.id}-my-offer`}
            data-provider={item.provider}
            data-active={active === item.id}
            onClick={(event) => {
              event.stopPropagation()
              event.preventDefault()
              onClick(item.id)
            }}
          >
            <div
              data-image
              style={{
                backgroundImage: `url(/svg/category/${item.categoryId}.svg)`,
              }}
            />
            <h3>{categories?.find((item_) => Number(item_.id) === Number(item?.categoryId))?.title}</h3>
          </li>
        ))}
      </ul>
      <Button
        type="button"
        typeButton="fill-primary"
        onClick={(event) => {
          event.stopPropagation()
          updateProfileOffers()
        }}
        label="Добавить предложение"
      />
    </article>
  )
})
