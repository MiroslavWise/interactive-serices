"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { IResponseOffers } from "@/services/offers/types"

import { Button, ImageCategory } from "@/components/common"
import ItemImages from "@/components/templates/Balloon/Offer/components/ItemImages"

import { getOffersCategories } from "@/services"
import { dispatchBallonOffer, dispatchDeleteOffer, dispatchMapCoordinates, dispatchUpdateOffer } from "@/store"

import styles from "./style.module.scss"

export const PersonalAccountCardOffer = ({ offer }: { offer: IResponseOffers }) => {
  const { category } = offer ?? {}
  const { data } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = data?.res || []

  const categoriesInExchange = useMemo(() => {
    if (!categories.length) return []

    return offer.categories?.map((item) => categories?.find((item_) => item_?.id === item!)!)
  }, [categories, offer.categories])

  const images = useMemo(() => {
    return offer?.images || []
  }, [offer])

  function handleUpdate() {
    dispatchUpdateOffer(true, offer)
  }

  const geoData = offer?.addresses?.length > 0 ? offer?.addresses[0] : null

  function handleToMap() {
    if (geoData) {
      dispatchMapCoordinates({
        zoom: 17,
        coordinates: geoData?.coordinates?.split(" ")?.map(Number),
      })
      dispatchBallonOffer({ offer: offer })
    }
  }

  return (
    <div className={styles.container}>
      <div data-header>
        <div data-img>
          <ImageCategory id={category?.id!} />
        </div>
        <h3>{category?.title}</h3>
      </div>
      <section>
        <div data-block-offer>
          <div data-proposal>
            <span>Предложение</span>
            <p>{offer?.description}</p>
          </div>
          {images.length > 0 ? <ItemImages images={images} /> : null}
        </div>
        {categoriesInExchange?.length > 0 ? (
          <div data-exchange>
            <span>В обмен</span>
            <ul>
              {categoriesInExchange.map((item) => (
                <li key={`::item::exchange::${item?.id!}::`}>
                  <div data-img>
                    <ImageCategory id={item?.id!} />
                  </div>
                  <span>{item?.title}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div data-footer>
          {geoData ? (
            <div data-geo className="flex flex-row items-start gap-1">
              <div className="relative w-4 h-4 p-2">
                <img
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4"
                  src="/svg/geo-marker.svg"
                  alt="geo"
                  width={16}
                  height={16}
                />
              </div>
              <span>{geoData?.additional}</span>
              <Link className="relative w-5 h-5 p-0.625 ml-auto" href={{ pathname: "/" }} onClick={handleToMap}>
                <img
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5"
                  src="/svg/arrow-right-accent.svg"
                  alt="+"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          ) : null}
          <div data-buttons>
            <Button
              type="button"
              typeButton="regular-primary"
              onClick={handleUpdate}
              prefixIcon={<img src="/svg/change-icon.svg" alt="change" width={16} height={16} />}
              label="Изменить предложение"
            />
            <button data-cirlce onClick={() => dispatchDeleteOffer({ visible: true, idOffer: offer?.id! })}>
              <img src="/svg/trash-black.svg" alt="trash" width={16} height={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
