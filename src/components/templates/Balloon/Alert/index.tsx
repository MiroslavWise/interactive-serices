"use client"

import { ButtonClose } from "@/components/common"

import { ItemImages } from "../Offer/components/ItemImages"
import { BlockCommentaries } from "../Discussion/components/BlockCommentaries"

import { cx } from "@/lib/cx"
import { daysAgo } from "@/helpers"
import { dispatchBallonAlert, useBalloonAlert } from "@/store"

import common from "../styles/general.module.scss"
import styles from "../Discussion/styles/style.module.scss"

export const BalloonAlert = () => {
  const offer = useBalloonAlert(({ offer }) => offer)
  const visible = useBalloonAlert(({ visible }) => visible)

  const images = offer?.images || []

  function close() {
    dispatchBallonAlert({ visible: false, offer: undefined })
  }

  return (
    <div className={cx("wrapper-fixed", styles.wrapper, common.wrapper)} data-visible={visible}>
      <section data-section-modal data-alert>
        <ButtonClose onClick={close} />
        <header>
          <div data-img>
            <img src="/svg/SOS.svg" alt="SOS" width={24} height={24} />
          </div>
          <h3>SOS-cообщение</h3>
        </header>
        <div data-container>
          <article>
            <p>{offer?.title}</p>
            {images?.length > 0 ? <ItemImages {...{ images }} /> : null}
            {offer?.updated ? <time>{daysAgo(offer?.updated)}</time> : null}
          </article>
          <BlockCommentaries isAlert />
        </div>
      </section>
    </div>
  )
}
