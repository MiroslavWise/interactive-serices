"use client"

import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import { ItemImages } from "../Offer/components/ItemImages"
import { ProfileComponent } from "../components/ProfileComponent"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"
import { GeoData } from "@/components/common/Card/GeneralServiceAllItem/components/GeoData"

import { cx } from "@/lib/cx"
import { ButtonClose } from "@/components/common"
import { BlockAction } from "./components/BlockAction"
import { BlockComments } from "../components/BlockComments"
import { dispatchBallonDiscussion, useBalloonDiscussion } from "@/store/hooks"

import styles from "./styles/style.module.scss"
import common from "../styles/general.module.scss"

export const BalloonDiscussion = () => {
  const offer = useBalloonDiscussion(({ offer }) => offer)
  const visible = useBalloonDiscussion(({ visible }) => visible)
  const { id, userId: idUser, content } = offer ?? {}

  const images = offer?.images || []

  function close() {
    dispatchBallonDiscussion({ visible: false, offer: undefined })
  }

  return (
    <div className={cx("wrapper-fixed", styles.wrapper, common.wrapper)} data-visible={visible}>
      <section data-section-modal>
        <ButtonClose position={{}} onClick={close} />
        <header data-color={EnumTypeProvider.discussion}>
          <div data-img>
            <IconDiscussionBalloon />
          </div>
          <h3> {content ? content : "Обсуждение"}</h3>
        </header>
        <div data-container>
          <ProfileComponent offer={offer as unknown as IResponseOffers} />
          <article>
            <p>{offer?.title}</p>
            {images?.length > 0 ? <ItemImages {...{ images }} /> : null}
          </article>
          <GeoData offer={offer as unknown as IResponseOffers} />
          <BlockAction offer={offer as unknown as IResponseOffers} />
          <BlockComments offer={offer as unknown as IResponseOffers} close={close} />
        </div>
      </section>
    </div>
  )
}
