"use client"

import { EnumTypeProvider } from "@/types/enum"

import { ItemImages } from "../Offer/components/ItemImages"
import { BlockCommentaries } from "./components/BlockCommentaries"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"

import { cx } from "@/lib/cx"
import { daysAgo } from "@/helpers"
import { ButtonClose } from "@/components/common"
import { dispatchBallonDiscussion, useBalloonDiscussion } from "@/store/hooks"

import styles from "./styles/style.module.scss"
import common from "../styles/general.module.scss"

export const BalloonDiscussion = () => {
  const offer = useBalloonDiscussion(({ offer }) => offer)
  const visible = useBalloonDiscussion(({ visible }) => visible)
  const { id, userId: idUser } = offer ?? {}

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
          <h3>Обсуждение</h3>
        </header>
        <div data-container>
          <article>
            <p>{offer?.title}</p>
            {images?.length > 0 ? <ItemImages {...{ images }} /> : null}
            {offer?.updated ? <time>{daysAgo(offer?.updated)}</time> : null}
          </article>
          <BlockCommentaries close={close} id={id!} idUser={idUser!} />
        </div>
      </section>
    </div>
  )
}
