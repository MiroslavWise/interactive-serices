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
import { cx } from "@/lib/cx"
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
    } else if (provider === EnumTypeProvider.discussion) {
      dispatchBallonDiscussion({ offer: offer })
    } else if (provider === EnumTypeProvider.alert) {
      dispatchBallonAlert({ offer: offer })
    }
    dispatchMobileSearchCategoryVisible(false)
  }

  //

  return (
    <article
      className={cx(styles.container, "w-full rounded-2xl border-solid border-[1px] p-4 flex flex-col gap-3 cursor-pointer")}
      data-provider={provider}
      onClick={(event) => {
        event.stopPropagation()
        handleClick()
      }}
    >
      <HeaderTimeDots offer={offer} />
      <HeaderTitle offer={offer} />
      <section className="overflow-hidden w-full">
        <p className="text-text-primary text-sm font-normal line-clamp-4">{description}</p>
      </section>
      {images?.length ? <ItemImages images={images} /> : null}
      <GeoData offer={offer} />
      <ItemProfile user={user} />
    </article>
  )
}

CardBallon.displayName = "CardBallon"
export default CardBallon
