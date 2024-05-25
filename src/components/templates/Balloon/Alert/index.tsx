"use client"

import { useEffect, useState } from "react"

import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import ItemImages from "../Offer/components/ItemImages"
import { BlockComments } from "../components/BlockComments"
import BlockAction from "../Discussion/components/BlockAction"
import { ProfileComponent } from "../components/ProfileComponent"
import IconAlertBalloon from "@/components/icons/IconAlertBalloon"
import GeoData from "@/components/common/Card/CardBallon/components/GeoData"

import { dispatchBallonAlert, useBalloonAlert } from "@/store"

export default function BalloonAlert() {
  const offer = useBalloonAlert(({ offer }) => offer)
  const { title, description, images = [] } = offer ?? {}
  const [expandComment, setExpandComment] = useState(false)

  useEffect(() => {
    return () => dispatchBallonAlert({ offer: undefined })
  }, [])

  return (
    <>
      <header data-color={EnumTypeProvider.alert}>
        <div data-img>
          <IconAlertBalloon />
        </div>
        <h3 style={{ color: "var(--text-primary)" }}>{title ? title : "SOS-cообщение"}</h3>
      </header>
      <div data-container>
        <div data-container-children>
          <ProfileComponent offer={offer as unknown as IResponseOffers} />
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
