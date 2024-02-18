"use client"

import { ItemImages } from "../Offer/components/ItemImages"
import { BlockCommentaries } from "./components/BlockCommentaries"

import { cx } from "@/lib/cx"
import { daysAgo } from "@/helpers"
import { ButtonClose } from "@/components/common"
import { dispatchBallonDiscussion, useBalloonDiscussion } from "@/store/hooks"

import styles from "./styles/style.module.scss"
import common from "../styles/general.module.scss"

export const BalloonDiscussion = () => {
  const offer = useBalloonDiscussion(({ offer }) => offer)
  const visible = useBalloonDiscussion(({ visible }) => visible)

  const images = offer?.images || []

  return (
    <div className={cx("wrapper-fixed", styles.wrapper, common.wrapper)} data-visible={visible}>
      <section data-section-modal>
        <ButtonClose
          position={{}}
          onClick={() => {
            dispatchBallonDiscussion({ visible: false, offer: undefined })
          }}
        />
        <header>
          <div data-img>
            <img src="/svg/3d/3d-message.svg" alt="dis" width={24} height={24} />
          </div>
          <h3>Обсуждение</h3>
        </header>
        <div data-container>
          <article>
            <p>{offer?.title}</p>
            {images?.length > 0 ? <ItemImages {...{ images }} /> : null}
            {offer?.updated ? <time>{daysAgo(offer?.updated)}</time> : null}
          </article>
          <BlockCommentaries />
        </div>
      </section>
    </div>
  )
}
