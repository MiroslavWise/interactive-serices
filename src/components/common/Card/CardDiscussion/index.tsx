"use client"

import Image from "next/image"

import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import { Button } from "@/components/common"
import ItemImages from "@/components/templates/Balloon/Offer/components/ItemImages"

import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer, dispatchModal, EModalData } from "@/store"

import styles from "./style.module.scss"

export function CardDiscussion(props: IResponseOffers) {
  const { title, images, provider, description } = props ?? {}

  const contentTitle = title
    ? title
    : provider === EnumTypeProvider.alert
    ? "SOS-сообщение"
    : provider === EnumTypeProvider.discussion
    ? "Дискуссия"
    : "Заголовок"

  function handleOpenMore() {
    if (provider === EnumTypeProvider.discussion) {
      dispatchBallonDiscussion({ offer: props })
      dispatchModal(EModalData.BalloonDiscussion)
      return
    } else if (provider === EnumTypeProvider.alert) {
      dispatchBallonAlert({ offer: props })
      dispatchModal(EModalData.BalloonAlert)
    } else if (provider === EnumTypeProvider.offer) {
      dispatchBallonOffer({ offer: props })
      dispatchModal(EModalData.BalloonOffer)
    }
  }

  return (
    <li className={styles.container}>
      <article>
        <div data-header>
          <h4>{contentTitle}</h4>
        </div>
        <p>{description || ""}</p>
        {images.length > 0 ? <ItemImages images={images} /> : null}
        <div data-footer>
          <Button
            type="button"
            label="Изменить"
            typeButton="fill-primary"
            prefixIcon={<Image src="/svg/edit-white.svg" alt="edit" width={14} height={14} unoptimized />}
            disabled
          />
          <Button type="button" typeButton="fill-primary" label="Обзор" onClick={handleOpenMore} />
        </div>
      </article>
    </li>
  )
}
