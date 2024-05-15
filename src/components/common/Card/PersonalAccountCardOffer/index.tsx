"use client"

import { useMemo } from "react"

import type { IResponseOffers } from "@/services/offers/types"

import { Button } from "@/components/common"
import ItemImages from "@/components/templates/Balloon/Offer/components/ItemImages"

import { usePush } from "@/helpers"
import { IconCategory } from "@/lib/icon-set"
import {
  dispatchBallonOffer,
  dispatchDeleteOffer,
  dispatchMapCoordinates,
  dispatchModal,
  dispatchUpdateOffer,
  EModalData,
  useOffersCategories,
} from "@/store"

import styles from "./style.module.scss"

export const PersonalAccountCardOffer = ({ offer }: { offer: IResponseOffers }) => {
  const { handlePush } = usePush()
  const categories = useOffersCategories(({ categories }) => categories)

  const category = useMemo(() => {
    return categories?.find((item) => offer?.categoryId === item?.id)
  }, [categories, offer])

  const categoriesInExchange = useMemo(() => {
    const items = offer.categories?.map((item) => categories?.find((item_) => item_?.id === item!)!)

    return items
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
      dispatchModal(EModalData.BalloonOffer)
      dispatchBallonOffer({ offer: offer })
      handlePush("/")
    }
  }

  return (
    <div className={styles.container}>
      <div data-header>
        <div data-img>
          <img
            src={IconCategory(category?.id!)}
            alt={`${category?.id!}`}
            width={16}
            height={16}
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
        <h3>{category?.title}</h3>
      </div>
      <section>
        <div data-block-offer>
          <div data-proposal>
            <span>Предложение</span>
            <p>{offer?.title}</p>
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
                    <img
                      src={IconCategory(item?.id!)}
                      alt={`${item?.id!}`}
                      width={16}
                      height={16}
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
                  <span>{item?.title}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div data-footer>
          {geoData ? (
            <div data-geo>
              <div data-img-g>
                <img src="/svg/geo-marker.svg" alt="geo" width={16} height={16} />
              </div>
              <span>{geoData?.additional}</span>
              <button onClick={handleToMap}>
                <img src="/svg/arrow-right-accent.svg" alt="+" width={20} height={20} />
              </button>
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
