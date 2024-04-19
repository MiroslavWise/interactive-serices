"use client"

import { useEffect } from "react"

import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import { ItemImages } from "../Offer/components/ItemImages"
import { ProfileComponent } from "../components/ProfileComponent"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"
import { GeoData } from "@/components/common/Card/GeneralServiceAllItem/components/GeoData"

import { BlockAction } from "./components/BlockAction"
import { BlockComments } from "../components/BlockComments"

import { dispatchBallonDiscussion, useBalloonDiscussion } from "@/store"

export default function BalloonDiscussion() {
  const offer = useBalloonDiscussion(({ offer }) => offer)
  const { content, title, images = [] } = offer ?? {}

  useEffect(() => {
    return () => dispatchBallonDiscussion({ offer: undefined })
  }, [])

  return (
    <>
      <header data-color={EnumTypeProvider.discussion}>
        <div data-img>
          <IconDiscussionBalloon />
        </div>
        <h3> {content ? content : "Обсуждение"}</h3>
      </header>
      <div data-container>
        <div data-container-children>
          <ProfileComponent offer={offer as unknown as IResponseOffers} />
          <article>
            <p>{title}</p>
            {images?.length > 0 ? <ItemImages {...{ images }} /> : null}
          </article>
          <GeoData offer={offer as unknown as IResponseOffers} />
          <BlockAction offer={offer as unknown as IResponseOffers} />
          <BlockComments offer={offer as unknown as IResponseOffers} />
        </div>
      </div>
    </>
  )
}
