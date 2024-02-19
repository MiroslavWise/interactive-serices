"use client"

import Link from "next/link"
import { flushSync } from "react-dom"
import { useQuery } from "@tanstack/react-query"
import { Button, ButtonClose, ImageCategory, LoadingProfile } from "@/components/common"

import { ItemProfile } from "./components/ItemProfile"
import { ItemProposal } from "./components/ItemProposal"

import { cx } from "@/lib/cx"
import { getUserId } from "@/services"
import { dispatchAuthModal, dispatchBallonOffer, dispatchReciprocalExchange, useAuth, useBalloonOffer, useOffersCategories } from "@/store"

import styles from "./styles/style.module.scss"
import common from "../styles/general.module.scss"

export const BalloonOffer = () => {
  const userId = useAuth(({ userId }) => userId)
  const categories = useOffersCategories(({ categories }) => categories)
  const visible = useBalloonOffer(({ visible }) => visible)
  const offer = useBalloonOffer(({ offer }) => offer)

  const categoryCurrent = categories?.find((item) => item?.id === offer?.categoryId)

  const { data, isLoading: isLoadUser } = useQuery({
    queryFn: () => getUserId(offer?.userId!),
    queryKey: ["user", { userId: offer?.userId }],
    enabled: !!offer?.userId,
  })

  const { res } = data ?? {}
  const { profile } = res ?? {}

  function handle() {
    if (!userId) {
      dispatchAuthModal({
        visible: true,
        type: "SignIn",
      })
      flushSync(() => {
        dispatchBallonOffer({ visible: false })
      })
      return
    } else if (!!userId && userId !== offer?.userId) {
      dispatchReciprocalExchange({
        visible: true,
        offer: offer!,
        type: "current",
      })
      flushSync(() => {
        dispatchBallonOffer({ visible: false })
      })
      return
    }
  }

  return (
    <div className={cx("wrapper-fixed", styles.wrapper, common.wrapper)} data-visible={visible}>
      <section data-section-modal>
        <header>
          <div data-category-img>{offer?.categoryId ? <ImageCategory id={offer?.categoryId!} /> : null}</div>
          <h3>{categoryCurrent?.title}</h3>
        </header>
        <ButtonClose position={{}} onClick={() => dispatchBallonOffer({ visible: false })} />
        <div data-container>
          {isLoadUser ? <LoadingProfile /> : <ItemProfile profile={profile!} />}
          <ItemProposal />
          <div data-buttons>
            <Button
              type="button"
              typeButton="fill-primary"
              label="Откликнуться"
              onClick={handle}
              disabled={!!userId && userId === offer?.userId}
            />
            {userId && userId !== offer?.userId ? (
              <Link
                data-circle
                href={{ pathname: "/messages", query: { user: offer?.userId } }}
                onClick={() => {
                  dispatchBallonOffer({ visible: false })
                }}
              >
                <img src="/svg/message-dots-circle-primary.svg" alt="chat" width={20} height={20} />
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}
