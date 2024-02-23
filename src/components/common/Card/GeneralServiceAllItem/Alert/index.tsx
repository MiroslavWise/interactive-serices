import dayjs from "dayjs"

import type { IResponseOffers } from "@/services/offers/types"

import { ItemProfile } from "../components/ItemProfile"
import { ItemImages } from "@/components/templates/Balloon/Offer/components/ItemImages"

import { cx } from "@/lib/cx"
import { dispatchBallonAlert, dispatchMapCoordinates } from "@/store"
import { daysAgo } from "@/helpers"

import styles from "../styles/alert.module.scss"
import styleMain from "../styles/main.module.scss"

export function GeneralAlert({ offer }: { offer: IResponseOffers }) {
  const { id, title, content, addresses, userId, images = [], created } = offer ?? {}

  const geo = addresses?.length > 0 ? addresses[0] : null

  function handle() {
    const [address] = addresses

    dispatchBallonAlert({ visible: true, offer: offer })

    if (address) {
      dispatchMapCoordinates({
        coordinates: address?.coordinates?.split(" ")?.map(Number),
      })
    }
  }

  return (
    <div
      className={cx(styleMain.container, styles.container)}
      onClick={(event) => {
        event.stopPropagation()
        handle()
      }}
    >
      <time dateTime={created as string}>
        {daysAgo(created)} {dayjs(created).format("HH:mm ")}
      </time>
      <header>
        <div data-img>
          <img src="/svg/SOS.svg" alt="SOS" width={18} height={18} />
        </div>
        <h3>{content ? content : "SOS-сообщение"}</h3>
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
