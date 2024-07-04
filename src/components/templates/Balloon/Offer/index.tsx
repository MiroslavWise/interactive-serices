"use client"

import { ImageCategory } from "@/components/common"

import { IResponseOffers } from "@/services/offers/types"
import { EnumTypeProvider } from "@/types/enum"

import Buttons from "./components/Buttons"
import { ItemDescriptions } from "./components/ItemDescriptions"
import { ProfileComponent } from "../components/ProfileComponent"
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
      <div data-container>
        <div data-container-children>
          <ProfileComponent offer={offer as unknown as IResponseOffers} />
          <ItemDescriptions offer={offer as unknown as IResponseOffers} />
          <Buttons offer={offer as unknown as IResponseOffers}>
            <GeoData offer={offer as unknown as IResponseOffers} />
          </Buttons>
        </div>
      </div>
    </>
  )
}
