import { EnumTypeProvider } from "@/types/enum"
import type { IResponseOffers } from "@/services/offers/types"

import GeoData from "./components/GeoData"
import AdvertButtons from "../AdvertButtons"
import HeaderTitle from "./components/HeaderTitle"
import ItemProfile from "./components/ItemProfile"
import HeaderTimeDots from "./components/HeaderTimeDots"
import AdvertisingData from "./components/AdvertisingData"
import AdvertisingTitleCompany from "./components/AdvertisingTitleCompany"
import ItemImages from "@/components/templates/Balloon/Offer/components/ItemImages"

import { cx } from "@/lib/cx"
import { dispatchBallonAlert, dispatchBallonOffer, dispatchMapCoordinates, dispatchMobileSearchCategoryVisible } from "@/store"

import styles from "./styles/style.module.scss"
interface IProps {
  offer: IResponseOffers
  className?: string
}

function CardBallon({ offer, className }: IProps) {
  const { provider, description, images, addresses, user, category, id, company } = offer ?? {}

  const isAdvertising = !!company

  function handleClick() {
    const [address] = addresses

    if (address) {
      dispatchMapCoordinates({
        coordinates: address?.coordinates?.split(" ")?.map(Number),
      })
    }

    if (provider === EnumTypeProvider.offer) {
      dispatchBallonOffer({ offer: offer })
    } else if (provider === EnumTypeProvider.alert) {
      dispatchBallonAlert({ offer: offer })
    }
    dispatchMobileSearchCategoryVisible(false)
  }

  const replaceImageFiles = images.filter((item) => item.attributes.mime.includes("image") || item.attributes.mime.includes("video"))

  if (isAdvertising) {
    return (
      <div
        className={cx(
          styles.container,
          "w-full cursor-pointer p-4 flex flex-col gap-3 border-solid border rounded-2xl border-l-2 border-l-element-accent-1",
          provider === EnumTypeProvider.offer && "bg-BG-second border-grey-stroke-light",
          className,
        )}
        onClick={(event) => {
          event.stopPropagation()
          handleClick()
        }}
      >
        <HeaderTimeDots offer={offer} />
        <AdvertisingTitleCompany offer={offer} company={company} provider={provider} />
        <p className="text-text-primary text-sm font-normal line-clamp-4">{description}</p>
        {replaceImageFiles.length > 0 ? <ItemImages images={replaceImageFiles} /> : null}
        <AdvertisingData company={company} />
        <AdvertButtons provider={provider} offer={offer} />
      </div>
    )
  }

  return (
    <article
      className={cx(
        styles.container,
        "w-full cursor-pointer p-4 flex flex-col gap-3 border-solid border rounded-2xl",
        provider === EnumTypeProvider.offer && "bg-BG-second border-grey-stroke-light",
        provider === EnumTypeProvider.alert && "bg-card-red border-card-border-red",
        provider === EnumTypeProvider.discussion && "!hidden",
        className,
      )}
      onClick={(event) => {
        event.stopPropagation()
        handleClick()
      }}
    >
      <HeaderTimeDots offer={offer} />
      <HeaderTitle offer={offer} />
      <section className="overflow-hidden w-full flex flex-col gap-3">
        <b className="text-text-primary text-base text-start font-medium">{category?.title ?? ""}</b>
        <p className="text-text-primary text-sm font-normal line-clamp-4">{description}</p>
      </section>
      {replaceImageFiles.length > 0 ? <ItemImages images={replaceImageFiles} /> : null}
      <GeoData offer={offer} />
      <ItemProfile user={user} provider={provider} targetId={id!} />
    </article>
  )
}

CardBallon.displayName = "CardBallon"
export default CardBallon
