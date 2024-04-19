"use client"

import type { IResponseOffers } from "@/services/offers/types"

import { GeoData } from "../components/GeoData"
import { ItemProfile } from "../components/ItemProfile"
import { HeaderTimeDots } from "../components/HeaderTimeDots"
import { ItemImages } from "@/components/templates/Balloon/Offer/components/ItemImages"

import { cx } from "@/lib/cx"
import { dispatchBallonDiscussion, dispatchMobileSearchCategoryVisible, dispatchModal, EModalData } from "@/store"

import styleMain from "../styles/main.module.scss"
import styles from "../styles/discussion.module.scss"

export default function GeneralDiscussion({ offer }: { offer: IResponseOffers }) {
  const { id, title, content, userId, images = [] } = offer ?? {}

  function handle() {
    dispatchBallonDiscussion({ offer: offer })
    dispatchModal(EModalData.BalloonDiscussion)
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
          <img src="/svg/discussin-card.svg" alt="dis" width={26} height={26} />
        </div>
        <h3>{content ? content : "Обсуждение"}</h3>
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
