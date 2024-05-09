"use client"

import { useEffect, useState } from "react"

import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import BlockAction from "./components/BlockAction"
import ItemImages from "../Offer/components/ItemImages"
import { BlockComments } from "../components/BlockComments"
import { ProfileComponent } from "../components/ProfileComponent"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"
import GeoData from "@/components/common/Card/CardBallon/components/GeoData"

import { dispatchBallonDiscussion, useBalloonDiscussion } from "@/store"

function BalloonDiscussion() {
  const offer = useBalloonDiscussion(({ offer }) => offer)
  const { content, title, images = [] } = offer ?? {}
  const [expandComment, setExpandComment] = useState(false)

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
          <BlockAction offer={offer as unknown as IResponseOffers} setExpandComment={setExpandComment} />
          <BlockComments offer={offer as unknown as IResponseOffers} expandComment={expandComment} setExpandComment={setExpandComment} />
        </div>
      </div>
    </>
  )
}

BalloonDiscussion.displayName = "BalloonDiscussion"
export default BalloonDiscussion
