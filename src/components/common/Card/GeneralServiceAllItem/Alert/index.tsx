import type { IResponseOffers } from "@/services/offers/types"

import { GeoData } from "../components/GeoData"
import { ItemProfile } from "../components/ItemProfile"
import { HeaderTimeDots } from "../components/HeaderTimeDots"
import { ItemImages } from "@/components/templates/Balloon/Offer/components/ItemImages"

import { cx } from "@/lib/cx"
import { dispatchBallonAlert, dispatchMapCoordinates, dispatchMobileSearchCategoryVisible, dispatchModal, EModalData } from "@/store"

import styles from "../styles/alert.module.scss"
import styleMain from "../styles/main.module.scss"

export default function GeneralAlert({ offer }: { offer: IResponseOffers }) {
  const { id, title, content, addresses, userId, images = [] } = offer ?? {}

  function handle() {
    const [address] = addresses

    dispatchBallonAlert({ offer: offer })
    dispatchModal(EModalData.BalloonAlert)

    if (address) {
      dispatchMapCoordinates({
        coordinates: address?.coordinates?.split(" ")?.map(Number),
      })
    }
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
          <img src="/svg/SOS.svg" alt="SOS" width={18} height={18} />
        </div>
        <h3>{content ? content : "SOS-сообщение"}</h3>
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
