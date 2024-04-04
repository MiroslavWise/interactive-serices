"use client"

import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import { ItemImages } from "../Offer/components/ItemImages"
import { BlockComments } from "../components/BlockComments"
import { ProfileComponent } from "../components/ProfileComponent"
import IconAlertBalloon from "@/components/icons/IconAlertBalloon"
import { GeoData } from "@/components/common/Card/GeneralServiceAllItem/components/GeoData"

import { dispatchBallonAlert, dispatchModalClose, useBalloonAlert } from "@/store"

import common from "../styles/general.module.scss"
import styles from "../Discussion/styles/style.module.scss"

export default function BalloonAlert() {
  const offer = useBalloonAlert(({ offer }) => offer)
  const { title, content, images = [] } = offer ?? {}

  function close() {
    dispatchModalClose()
    dispatchBallonAlert({ offer: undefined })
  }

  return (
    <>
      <header data-color={EnumTypeProvider.alert}>
        <div data-img>
          <IconAlertBalloon />
        </div>
        <h3 style={{ color: "var(--text-primary)" }}>{content ? content : "SOS-cообщение"}</h3>
      </header>
      <div data-container>
        <div data-container-children>
          <ProfileComponent offer={offer as unknown as IResponseOffers} />
          <article>
            <p>{title}</p>
            {images?.length > 0 ? <ItemImages {...{ images }} /> : null}
          </article>
          <GeoData offer={offer as unknown as IResponseOffers} />
          <BlockComments close={close} offer={offer as unknown as IResponseOffers} />
        </div>
      </div>
    </>
  )
}
