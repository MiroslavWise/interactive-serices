"use client"

import Image from "next/image"

import { IResponseOffers } from "@/services/offers/types"

import { Button } from "@/components/common"
import { ItemImages } from "@/components/templates/Balloon/Offer/components/ItemImages"

import { dispatchBallonDiscussion, useBalloonCard } from "@/store/hooks"

import styles from "./style.module.scss"

export function CardDiscussion(props: IResponseOffers) {
  const { title, images, provider, id, userId } = props ?? {}
  const dispatch = useBalloonCard(({ dispatch }) => dispatch)

  function handleOpenMore() {
    if (provider === "discussion") {
      dispatchBallonDiscussion({
        visible: true,
        offer: props,
      })
      return
    }
    dispatch({
      visible: true,
      type: provider,
      id: id,
      idUser: userId,
    })
  }

  return (
    <li className={styles.container}>
      <article>
        <div data-header>
          <h4>{title}</h4>
        </div>
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
