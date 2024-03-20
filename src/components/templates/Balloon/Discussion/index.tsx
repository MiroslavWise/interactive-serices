"use client"

import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import { ItemImages } from "../Offer/components/ItemImages"
import { BlockCommentaries } from "./components/BlockCommentaries"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"

import { cx } from "@/lib/cx"
import { daysAgo } from "@/helpers"
import { getUserId } from "@/services"
import { BlockAction } from "./components/BlockAction"
import { ItemProfile } from "../Offer/components/ItemProfile"
import { ButtonClose, LoadingProfile } from "@/components/common"
import { dispatchBallonDiscussion, useBalloonDiscussion } from "@/store/hooks"

import styles from "./styles/style.module.scss"
import common from "../styles/general.module.scss"
import { GeoData } from "@/components/common/Card/GeneralServiceAllItem/components/GeoData"

export const BalloonDiscussion = () => {
  const offer = useBalloonDiscussion(({ offer }) => offer)
  const visible = useBalloonDiscussion(({ visible }) => visible)
  const { id, userId: idUser, content } = offer ?? {}

  const { data, isLoading: isLoadUser } = useQuery({
    queryFn: () => getUserId(offer?.userId!),
    queryKey: ["user", { userId: offer?.userId }],
    enabled: !!offer?.userId,
  })
  const { res } = data ?? {}
  const { profile } = res ?? {}

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
          {isLoadUser ? <LoadingProfile /> : <ItemProfile profile={profile!} offer={offer as unknown as IResponseOffers} />}
          <article>
            <p>{offer?.title}</p>
            {images?.length > 0 ? <ItemImages {...{ images }} /> : null}
            {offer?.updated ? <time>{daysAgo(offer?.updated)}</time> : null}
          </article>
          <GeoData offer={offer as unknown as IResponseOffers} />
          <BlockAction offer={offer as unknown as IResponseOffers} />
          <BlockCommentaries close={close} id={id!} idUser={idUser!} />
        </div>
      </section>
    </div>
  )
}
