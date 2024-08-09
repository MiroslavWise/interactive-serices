"use client"

import { useState } from "react"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffers } from "@/services/offers/types"

import ItemProfile from "../components/ItemProfile"
import BlockComments from "../components/BlockComments"
import ItemImages from "../Offer/components/ItemImages"
import BlockAction from "../Discussion/components/BlockAction"
import IconAlertBalloon from "@/components/icons/IconAlertBalloon"
import GeoData from "@/components/common/Card/CardBallon/components/GeoData"

import { useBalloonAlert } from "@/store"

function BalloonAlert() {
  const offer = useBalloonAlert(({ offer }) => offer)
  const { title, description, images = [] } = offer ?? {}
  const [expandComment, setExpandComment] = useState(false)

  return (
    <>
      <header
        className="w-full rounded-t-3xl md:rounded-t-[2rem] grid grid-cols-[1.5rem_minmax(0,1fr)] items-start gap-2.5 p-5 border-b border-solid border-grey-stroke-light overflow-hidden"
        data-color={EnumTypeProvider.alert}
      >
        <div className="w-6 h-6 relative p-3 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-6 *h-6">
          <IconAlertBalloon />
        </div>
        <h3 style={{ color: "var(--text-primary)" }}>{title ? title : "SOS-cообщение"}</h3>
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

BalloonAlert.displayName = "BalloonAlert"
export default BalloonAlert
