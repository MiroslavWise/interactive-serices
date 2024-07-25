"use client"

import { ImageCategory } from "@/components/common"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffers } from "@/services/offers/types"

import Buttons from "./components/Buttons"
import { ItemProfile } from "../components/ItemProfile"
import { ItemDescriptions } from "./components/ItemDescriptions"
import GeoData from "@/components/common/Card/CardBallon/components/GeoData"

import { useBalloonOffer } from "@/store"

export default function BalloonOffer() {
  const offer = useBalloonOffer(({ offer }) => offer)

  return (
    <>
      <header data-color={EnumTypeProvider.offer}>
        <div data-category-img>{offer?.categoryId ? <ImageCategory id={offer?.categoryId!} /> : null}</div>
        <h3>{offer?.category?.title}</h3>
      </header>
      <div data-container className="w-full p-0 md:rounded-b-[2rem]">
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
