import type { IResponseOffers } from "@/services/offers/types"

import GeoData from "./components/GeoData"
import HeaderTitle from "./components/HeaderTitle"
import ItemProfile from "./components/ItemProfile"
import HeaderTimeDots from "./components/HeaderTimeDots"
import ItemImages from "@/components/templates/Balloon/Offer/components/ItemImages"

import { cx } from "@/lib/cx"
import {
  dispatchBallonAlert,
  dispatchBallonOffer,
  dispatchMapCoordinates,
  dispatchBallonDiscussion,
  dispatchMobileSearchCategoryVisible,
} from "@/store"
import { EnumTypeProvider } from "@/types/enum"

import styles from "./styles/style.module.scss"
import IconHelp from "@/components/icons/IconHelp"
interface IProps {
  offer: IResponseOffers
}

function CardBallon({ offer }: IProps) {
  const { provider, description, userId, images, addresses, user, urgent } = offer ?? {}

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
      className={cx(styles.container, "w-full rounded-2xl border-solid border cursor-pointer flex flex-col")}
      data-provider={provider}
      onClick={(event) => {
        event.stopPropagation()
        handleClick()
      }}
    >
      <header
        className={cx(
          "[background:linear-gradient(101deg,_#F56B59_0%,_#FA4E80_100%)] w-full py-1.5 px-2.5 flex-row gap-2 items-center justify-center rounded-t-2xl",
          !!urgent ? "flex" : "hidden",
        )}
      >
        <div className="w-4 h-4 relative">
          <IconHelp />
        </div>
        <span className="text-text-button text-xs font-medium">Помощь Курску</span>
      </header>
      <section className="w-full p-4 flex flex-col gap-3">
        <HeaderTimeDots offer={offer} />
        <HeaderTitle offer={offer} />
        <section className="overflow-hidden w-full">
          <p className="text-text-primary text-sm font-normal line-clamp-4">{description}</p>
        </section>
        {images?.length ? <ItemImages images={images} /> : null}
        <GeoData offer={offer} />
        <ItemProfile user={user} />
      </section>
    </article>
  )
}

CardBallon.displayName = "CardBallon"
export default CardBallon
