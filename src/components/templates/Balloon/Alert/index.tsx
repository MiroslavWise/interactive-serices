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

  const { title, content, images = [], updated, userId: idUser, id } = offer ?? {}

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
          <h3 style={{ color: "var(--text-primary)" }}>{content ? content : "SOS-cообщение"}</h3>
        </header>
        <div data-container>
          <article>
            <p>{title}</p>
            {images?.length > 0 ? <ItemImages {...{ images }} /> : null}
            {updated ? <time>{daysAgo(updated)}</time> : null}
          </article>
          <BlockCommentaries isAlert close={close} idUser={idUser!} id={id!} />
        </div>
      </section>
    </div>
  )
}
