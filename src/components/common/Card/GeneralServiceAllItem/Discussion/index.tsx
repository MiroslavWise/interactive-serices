"use client"

import type { IResponseOffers } from "@/services/offers/types"

import { ItemProfile } from "../components/ItemProfile"
import { ItemImages } from "@/components/templates/Balloon/Offer/components/ItemImages"

import { cx } from "@/lib/cx"
import { dispatchBallonDiscussion } from "@/store"

import styleMain from "../styles/main.module.scss"
import styles from "../styles/discussion.module.scss"

export function GeneralDiscussion({ offer }: { offer: IResponseOffers }) {
  const { id, title, content, addresses, userId, images = [] } = offer ?? {}

  const geo = addresses?.length > 0 ? addresses[0] : null

  function handle() {
    dispatchBallonDiscussion({
      visible: true,
      offer: offer,
    })
  }

  return (
    <div
      className={cx(styleMain.container, styles.container)}
      onClick={(event) => {
        event.stopPropagation()
        handle()
      }}
    >
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
      {geo ? (
        <footer>
          <div data-geo>
            <img src="/svg/geo-marker.svg" alt="geo" width={16} height={16} />
          </div>
          <span>{geo?.additional}</span>
        </footer>
      ) : null}
      <ItemProfile id={userId!} />
    </div>
  )
}
