"use client"

import type { TBadgeServices } from "./types"
import type { IResponseOffers } from "@/services/offers/types"

import { IconCategory } from "@/lib/icon-set"
import { dispatchBallonOffer, dispatchModal, EModalData, useOffersCategories } from "@/store"

import styles from "./style.module.scss"

export const BadgeServices: TBadgeServices = (props) => {
  const { categoryId, id, isClickable } = props ?? {}
  const categories = useOffersCategories(({ categories }) => categories)

  const infoCategory = categories?.find((item) => item?.id === categoryId)

  function handle() {
    if (id && isClickable) {
      const { isClickable, ...offer } = props ?? {}
      dispatchModal(EModalData.BalloonOffer)
      dispatchBallonOffer({ offer: offer! as IResponseOffers })
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
