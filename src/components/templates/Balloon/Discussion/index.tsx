"use client"

import { useState } from "react"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffers } from "@/services/offers/types"

import BlockAction from "./components/BlockAction"
import { ItemProfile } from "../components/ItemProfile"
import ItemImages from "../Offer/components/ItemImages"
import { BlockComments } from "../components/BlockComments"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"
import GeoData from "@/components/common/Card/CardBallon/components/GeoData"

import { useBalloonDiscussion } from "@/store"

function BalloonDiscussion() {
  const offer = useBalloonDiscussion(({ offer }) => offer)
  const { description, title, images = [] } = offer ?? {}
  const [expandComment, setExpandComment] = useState(false)

  return (
    <>
      <header data-color={EnumTypeProvider.discussion}>
        <div data-img>
          <IconDiscussionBalloon />
        </div>
        <h3> {title ? title : "Обсуждение"}</h3>
      </header>
      <div data-container className="w-full p-0 md:rounded-b-[2rem]">
        <div data-container-children className="p-0 py-5 w-full flex flex-col gap-5">
          <ItemProfile offer={offer as unknown as IResponseOffers} />
          <article>
            <p>{description}</p>
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
