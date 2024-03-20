"use client"

import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import { ItemImages } from "../Offer/components/ItemImages"
import { ItemProfile } from "../Offer/components/ItemProfile"
import { ButtonClose, LoadingProfile } from "@/components/common"
import IconAlertBalloon from "@/components/icons/IconAlertBalloon"
import { BlockCommentaries } from "../Discussion/components/BlockCommentaries"

import { cx } from "@/lib/cx"
import { daysAgo } from "@/helpers"
import { getUserId } from "@/services"
import { dispatchBallonAlert, useBalloonAlert } from "@/store"

import common from "../styles/general.module.scss"
import styles from "../Discussion/styles/style.module.scss"
import { GeoData } from "@/components/common/Card/GeneralServiceAllItem/components/GeoData"

export const BalloonAlert = () => {
  const offer = useBalloonAlert(({ offer }) => offer)
  const visible = useBalloonAlert(({ visible }) => visible)
  const { title, content, images = [], updated, userId: idUser, id } = offer ?? {}

  const { data, isLoading: isLoadUser } = useQuery({
    queryFn: () => getUserId(offer?.userId!),
    queryKey: ["user", { userId: offer?.userId }],
    enabled: !!offer?.userId,
  })
  const { res } = data ?? {}
  const { profile } = res ?? {}

  function close() {
    dispatchBallonAlert({ visible: false, offer: undefined })
  }

  return (
    <div className={cx("wrapper-fixed", styles.wrapper, common.wrapper)} data-visible={visible}>
      <section data-section-modal data-alert>
        <ButtonClose onClick={close} />
        <header data-color={EnumTypeProvider.alert}>
          <div data-img>
            <IconAlertBalloon />
          </div>
          <h3 style={{ color: "var(--text-primary)" }}>{content ? content : "SOS-cообщение"}</h3>
        </header>
        <div data-container>
          {isLoadUser ? <LoadingProfile /> : <ItemProfile profile={profile!} offer={offer as unknown as IResponseOffers} />}
          <article>
            <p>{title}</p>
            {images?.length > 0 ? <ItemImages {...{ images }} /> : null}
            {updated ? <time>{daysAgo(updated)}</time> : null}
          </article>
          <GeoData offer={offer as unknown as IResponseOffers} />
          <BlockCommentaries isAlert close={close} idUser={idUser!} id={id!} />
        </div>
      </section>
    </div>
  )
}
