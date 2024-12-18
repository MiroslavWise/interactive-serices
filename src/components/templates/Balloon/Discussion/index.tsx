"use client"

import { useState } from "react"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffers } from "@/services/offers/types"

import BlockAction from "./components/BlockAction"
import ItemProfile from "../components/ItemProfile"
import ItemImages from "../Offer/components/ItemImages"
import BlockComments from "../components/BlockComments"
import ComponentHelper from "../components/ComponentHelper"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"
import GeoData from "@/components/common/Card/CardBallon/components/GeoData"

import { cx } from "@/lib/cx"
import { useBalloonDiscussion } from "@/store"

function BalloonDiscussion() {
  const offer = useBalloonDiscussion(({ offer }) => offer)
  const { description, title, images = [], urgent } = offer ?? {}
  const [expandComment, setExpandComment] = useState(false)

  return (
    <>
      {/* <ComponentHelper urgent={!!urgent} /> */}
      <header
        className={cx(
          "w-full grid grid-cols-[1.5rem_minmax(0,1fr)] items-start gap-2.5 p-5 border-b border-solid border-grey-stroke-light overflow-hidden",
          // !!urgent ?
          //   "!h-auto py-4" :
          "rounded-t-3xl md:rounded-t-2 h-standard-header-modal",
        )}
        data-color={EnumTypeProvider.discussion}
      >
        <div className="w-6 h-6 relative p-3 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-6 *h-6">
          <IconDiscussionBalloon />
        </div>
        <h3 className="line-clamp-2 text-ellipsis">{title ? title : "Обсуждение"}</h3>
      </header>
      <div data-container className="w-full p-0 md:rounded-b-2">
        <div data-container-children className="p-0 py-5 w-full flex flex-col gap-5">
          <ItemProfile offer={offer as unknown as IResponseOffers} />
          <article>
            <p className="whitespace-pre-wrap">{description}</p>
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
