"use client"

import { ImageCategory } from "@/components/common"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffers } from "@/services/offers/types"

import Buttons from "./components/Buttons"
import ItemProfile from "../components/ItemProfile"
import ComponentHelper from "../components/ComponentHelper"
import ItemDescriptions from "./components/ItemDescriptions"
import GeoData from "@/components/common/Card/CardBallon/components/GeoData"

import { cx } from "@/lib/cx"
import { useBalloonOffer } from "@/store"

function BalloonOffer() {
  const offer = useBalloonOffer(({ offer }) => offer)

  return (
    <>
      <ComponentHelper urgent={!!offer?.urgent} />
      <header
        className={cx(
          "w-full grid grid-cols-[1.5rem_minmax(0,1fr)] items-start gap-2.5 p-5 border-b border-solid border-grey-stroke-light overflow-hidden",
          !!offer?.urgent ? "!h-auto py-4" : "rounded-t-3xl md:rounded-t-2 h-standard-header-modal",
        )}
        data-color={EnumTypeProvider.offer}
      >
        <div className="w-6 h-6 relative p-3 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-6 *h-6">
          {offer?.categoryId ? (
            <ImageCategory id={offer?.categoryId!} slug={offer?.category?.slug} provider={offer?.category?.provider} />
          ) : null}
        </div>
        <h3 className="line-clamp-2 text-ellipsis">{offer?.category?.title}</h3>
      </header>
      <div data-container className="w-full p-0 md:rounded-b-2">
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
