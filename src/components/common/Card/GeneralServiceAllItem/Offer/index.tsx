"use client"

import { useMemo } from "react"

import type { IResponseOffers } from "@/services/offers/types"

import { ItemProfile } from "../components/ItemProfile"
import { HeaderTimeDots } from "../components/HeaderTimeDots"
import { ItemImages } from "@/components/templates/Balloon/Offer/components/ItemImages"

import { cx } from "@/lib/cx"
import { IconCategory } from "@/lib/icon-set"
import { GeoData } from "../components/GeoData"
import {
  dispatchBallonOffer,
  dispatchMapCoordinates,
  dispatchMobileSearchCategoryVisible,
  dispatchModal,
  EModalData,
  useOffersCategories,
} from "@/store"

import styles from "../styles/offer.module.scss"
import styleMain from "../styles/main.module.scss"

export default function GeneralOffer({ offer }: { offer: IResponseOffers }) {
  const { categoryId, title = "", userId, addresses = [], images = [] } = offer ?? {}

  const categories = useOffersCategories(({ categories }) => categories)

  const iconTitleCategory = useMemo(() => {
    let img = "/svg/category/default.svg"
    let title = ""

    if (categoryId) {
      img = IconCategory(categoryId!)!
    }

    if (categories && categoryId) {
      for (const category of categories) {
        if (category.id === categoryId) {
          title = category.title
          break
        }
      }
    }

    return { img, title }
  }, [categoryId, categories])

  function handle() {
    const [address] = addresses

    if (address) {
      dispatchMapCoordinates({
        coordinates: address?.coordinates?.split(" ")?.map(Number),
      })
    }

    dispatchBallonOffer({ offer: offer })
    dispatchModal(EModalData.BalloonOffer)
    dispatchMobileSearchCategoryVisible(false)
  }

  return (
    <div
      className={cx(styleMain.container, styles.container)}
      onClick={(event) => {
        event.stopPropagation()
        handle()
      }}
    >
      <HeaderTimeDots offer={offer} />
      <header>
        <div data-img>
          <img
            src={iconTitleCategory.img}
            alt={`${categoryId!}`}
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
        <h3>{iconTitleCategory.title}</h3>
      </header>
      <article>
        <p>{title}</p>
      </article>
      {images?.length ? <ItemImages images={images} /> : null}
      <GeoData offer={offer} />
      <ItemProfile id={userId!} />
    </div>
  )
}
