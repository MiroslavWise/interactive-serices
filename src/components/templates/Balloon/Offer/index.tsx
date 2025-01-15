"use client"

import { ImageCategory, NextImageMotion } from "@/components/common"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffers } from "@/services/offers/types"

import Buttons from "./components/Buttons"
import ItemProfile from "../components/ItemProfile"
import TimeAndDots from "../components/TimeAndDots"
import ItemDescriptions from "./components/ItemDescriptions"
import AdvertButtons from "@/components/common/Card/AdvertButtons"
import GeoData from "@/components/common/Card/CardBallon/components/GeoData"
import AdvertisingData from "@/components/common/Card/CardBallon/components/AdvertisingData"

import { cx } from "@/lib/cx"
import { useBalloonOffer } from "@/store"

function BalloonOffer() {
  const offer = useBalloonOffer(({ offer }) => offer)

  const { company, title = "" } = offer ?? {}

  const isAdvertising = !!company
  const { image, title: titleCompany } = company ?? {}

  return isAdvertising ? (
    <>
      <header
        className={cx(
          "w-full bg-element-accent-1 rounded-t-3xl md:rounded-t-2 overflow-hidden p-5 pb-11 md:pb-[3.25rem]",
          !!image ? "grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-4" : "flex items-center justify-start",
          "-mb-6 md:-mb-8",
        )}
      >
        <div className={cx("relative w-10 h-10 rounded-sm overflow-hidden", !!image ? "flex" : "hidden")}>
          {!!image ? (
            <NextImageMotion
              src={image?.attributes?.url}
              hash={image?.attributes?.blur}
              alt={titleCompany ?? ""}
              width={80}
              height={80}
              className="object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10"
            />
          ) : null}
        </div>
        <h2 className="text-xl font-bold text-text-button">{title}</h2>
      </header>
      <div className="w-full rounded-3xl md:rounded-2 bg-BG-second p-5 flex flex-col gap-5 shadow-md relative">
        <TimeAndDots offer={offer as unknown as IResponseOffers} />
        <ItemDescriptions offer={offer as unknown as IResponseOffers} />
        <GeoData offer={offer as unknown as IResponseOffers} />
        <AdvertisingData company={company!} />
        <AdvertButtons provider={offer?.provider!} offer={offer as unknown as IResponseOffers} />
      </div>
    </>
  ) : (
    <>
      <header
        className="w-full grid grid-cols-[1.5rem_minmax(0,1fr)] items-start gap-2.5 p-5 border-b border-solid border-grey-stroke-light overflow-hidden rounded-t-3xl md:rounded-t-2 h-standard-header-modal"
        data-color={EnumTypeProvider.offer}
      >
        <div className="w-6 h-6 relative p-3 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-6 *h-6">
          {offer?.categoryId ? (
            <ImageCategory
              id={offer?.categoryId!}
              slug={offer?.category?.slug}
              provider={offer?.category?.provider}
              isUrgent={!!offer?.urgent}
            />
          ) : null}
        </div>
        <h3 className="line-clamp-2 text-ellipsis">{offer?.title ?? "Без названия"}</h3>
      </header>
      <div data-container className="w-full p-0 md:rounded-b-2 bg-BG-second">
        <div data-container-children className="p-0 py-5 w-full flex flex-col gap-5">
          <ItemProfile offer={offer as unknown as IResponseOffers} />
          <ItemDescriptions offer={offer as unknown as IResponseOffers} />
          <Buttons offer={offer as unknown as IResponseOffers}>
            <GeoData offer={offer as unknown as IResponseOffers} />
          </Buttons>
        </div>
      </div>
    </>
  )
}

BalloonOffer.displayName = "BalloonOffer"
export default BalloonOffer
