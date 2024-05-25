import type { IResponseOffers } from "@/services/offers/types"

import GeoData from "./components/GeoData"
import HeaderTitle from "./components/HeaderTitle"
import ItemProfile from "./components/ItemProfile"
import HeaderTimeDots from "./components/HeaderTimeDots"
import ItemImages from "@/components/templates/Balloon/Offer/components/ItemImages"

import styles from "./styles/style.module.scss"
import {
  EModalData,
  dispatchModal,
  dispatchBallonAlert,
  dispatchBallonOffer,
  dispatchMapCoordinates,
  dispatchBallonDiscussion,
  dispatchMobileSearchCategoryVisible,
} from "@/store"
import { EnumTypeProvider } from "@/types/enum"

interface IProps {
  offer: IResponseOffers
}

function CardBallon({ offer }: IProps) {
  const { provider, description, userId, images, addresses, user } = offer ?? {}

  function handleClick() {
    const [address] = addresses

    if (address) {
      dispatchMapCoordinates({
        coordinates: address?.coordinates?.split(" ")?.map(Number),
      })
    }

    if (provider === EnumTypeProvider.offer) {
      dispatchBallonOffer({ offer: offer })
      dispatchModal(EModalData.BalloonOffer)
    } else if (provider === EnumTypeProvider.discussion) {
      dispatchBallonDiscussion({ offer: offer })
      dispatchModal(EModalData.BalloonDiscussion)
    } else if (provider === EnumTypeProvider.alert) {
      dispatchBallonAlert({ offer: offer })
      dispatchModal(EModalData.BalloonAlert)
    }
    dispatchMobileSearchCategoryVisible(false)
  }

  return (
    <article
      className={styles.container}
      data-provider={provider}
      onClick={(event) => {
        event.stopPropagation()
        handleClick()
      }}
    >
      <HeaderTimeDots offer={offer} />
      <HeaderTitle offer={offer} />
      <section>
        <p>{description}</p>
      </section>
      {images?.length ? <ItemImages images={images} /> : null}
      <GeoData offer={offer} />
      <ItemProfile user={user} />
    </article>
  )
}

CardBallon.displayName = "CardBallon"
export default CardBallon
