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
  const { provider, description, images, addresses, user, urgent } = offer ?? {}

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
        "w-full rounded-2xl cursor-pointer flex flex-col",
        provider === EnumTypeProvider.offer && "bg-BG-second",
        provider === EnumTypeProvider.alert && "bg-card-red",
        provider === EnumTypeProvider.discussion && "bg-card-blue",
        className,
      )}
      onClick={(event) => {
        event.stopPropagation()
        handleClick()
      }}
      ref={ref}
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
      <section
        className={cx(
          "w-full p-4 flex flex-col gap-3  border-solid",
          // !!urgent ? "border-r border-l border-b rounded-b-2xl" :
          "border rounded-2xl",
          provider === EnumTypeProvider.offer && "border-grey-stroke-light",
          provider === EnumTypeProvider.alert && "border-card-border-red",
          provider === EnumTypeProvider.discussion && "border-card-border-blue",
        )}
      >
        <HeaderTimeDots offer={offer} />
        <HeaderTitle offer={offer} />
        <section className="overflow-hidden w-full">
          <p className="text-text-primary text-sm font-normal line-clamp-4">{description}</p>
        </section>
        {replaceImageFiles.length > 0 ? <ItemImages images={replaceImageFiles} /> : null}
        <GeoData offer={offer} />
        <ItemProfile user={user} />
      </section>
    </article>
  )
}

CardBallon.displayName = "CardBallon"
export default CardBallon
