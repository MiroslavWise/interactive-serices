import { EnumTypeProvider } from "@/types/enum"
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

import styles from "./styles/style.module.scss"
import { useMemo } from "react"
interface IProps {
  offer: IResponseOffers
  ref?: any
  className?: string
}

function CardBallon({ offer, ref, className }: IProps) {
  const { provider, description, images, addresses, user, category, id } = offer ?? {}

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

  const replaceImageFiles = useMemo(() => {
    const array = []

    for (const item of images) {
      if (item.attributes.mime.includes("image") || item.attributes.mime.includes("video")) {
        array.push(item)
      }
    }

    return array
  }, [images])

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
      {/* <header
        className={cx(
          "[background:var(--more-red-gradient)] w-full py-1.5 px-2.5 flex-row gap-2 items-center justify-center rounded-t-2xl",
          !!urgent && provider !== EnumTypeProvider.offer ? "flex" : "hidden",
        )}
      >
        <div className="w-4 h-4 relative">
          <IconHelp />
        </div>
        <span className="text-text-button text-xs font-medium">Щедрое сердце</span>
      </header> */}
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
