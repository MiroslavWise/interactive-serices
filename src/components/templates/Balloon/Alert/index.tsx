"use client"

import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import { ButtonClose } from "@/components/common"
import { ItemImages } from "../Offer/components/ItemImages"
import { BlockComments } from "../components/BlockComments"
import { ProfileComponent } from "../components/ProfileComponent"
import IconAlertBalloon from "@/components/icons/IconAlertBalloon"
import { GeoData } from "@/components/common/Card/GeneralServiceAllItem/components/GeoData"

import { cx } from "@/lib/cx"
import { dispatchBallonAlert, useBalloonAlert } from "@/store"

import common from "../styles/general.module.scss"
import styles from "../Discussion/styles/style.module.scss"

export const BalloonAlert = () => {
  const offer = useBalloonAlert(({ offer }) => offer)
  const visible = useBalloonAlert(({ visible }) => visible)
  const { title, content, images = [] } = offer ?? {}

  function close() {
    dispatchBallonAlert({ visible: false, offer: undefined })
  }

  return (
    <div className={cx("wrapper-fixed", styles.wrapper, common.wrapper)} data-visible={visible} data-test="wrapper-balloon-alert">
      <section data-section-modal data-alert data-test="section-balloon-alert">
        <ButtonClose onClick={close} />
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
      </section>
    </div>
  )
}
