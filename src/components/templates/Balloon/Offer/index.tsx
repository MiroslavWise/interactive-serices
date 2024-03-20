"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button, ButtonClose, ImageCategory } from "@/components/common"

import { IResponseOffers } from "@/services/offers/types"
import { EnumStatusBarter, EnumTypeProvider } from "@/types/enum"

import { ItemDescriptions } from "./components/ItemDescriptions"
import { ProfileComponent } from "../components/ProfileComponent"
import { GeoData } from "@/components/common/Card/GeneralServiceAllItem/components/GeoData"

import { cx } from "@/lib/cx"
import { usePush } from "@/helpers"
import { getBarters, getUserId } from "@/services"
import { dispatchAuthModal, dispatchBallonOffer, dispatchReciprocalExchange, useAuth, useBalloonOffer, useOffersCategories } from "@/store"

import styles from "./styles/style.module.scss"
import common from "../styles/general.module.scss"

export const BalloonOffer = () => {
  const userId = useAuth(({ userId }) => userId)
  const categories = useOffersCategories(({ categories }) => categories)
  const visible = useBalloonOffer(({ visible }) => visible)
  const offer = useBalloonOffer(({ offer }) => offer)
  const { handlePush } = usePush()

  const categoryCurrent = categories?.find((item) => item?.id === offer?.categoryId)

  const { data: dataExecutedBarter, isLoading: isLoadingExecutedBarter } = useQuery({
    queryFn: () =>
      getBarters({
        status: EnumStatusBarter.EXECUTED,
        user: userId!,
        order: "DESC",
      }),
    queryKey: ["barters", { userId: userId, status: EnumStatusBarter.EXECUTED }],
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!userId && visible && userId !== offer?.userId,
  })
  const { data: dataInitiatedBarter, isLoading: isLoadingInitiatedBarter } = useQuery({
    queryFn: () =>
      getBarters({
        status: EnumStatusBarter.INITIATED,
        user: userId!,
        order: "DESC",
      }),
    queryKey: ["barters", { userId: userId, status: EnumStatusBarter.INITIATED }],
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!userId && visible && userId !== offer?.userId,
  })
  //--

  const disabledReply = useMemo(() => {
    if (isLoadingExecutedBarter || isLoadingInitiatedBarter) return true
    const findExecuted = dataExecutedBarter?.res?.some(
      (some) =>
        (some.initiator.userId === offer?.userId || some.consigner.userId === offer?.userId) &&
        (some.consigner.id === offer.id || some.initiator.id),
    )
    if (findExecuted) return "executed-have"
    const findInitiated = dataInitiatedBarter?.res?.some(
      (some) =>
        (some.initiator.userId === offer?.userId || some.consigner.userId === offer?.userId) &&
        (some.consigner.id === offer.id || some.initiator.id),
    )
    if (findInitiated) return "initiated-have"
  }, [isLoadingExecutedBarter, isLoadingInitiatedBarter, dataExecutedBarter?.res, dataInitiatedBarter?.res, offer])

  function handle() {
    if (!userId) {
      dispatchAuthModal({
        visible: true,
        type: "SignIn",
      })
      requestAnimationFrame(() => {
        dispatchBallonOffer({ visible: false })
      })
      return
    } else if (!!userId && userId !== offer?.userId) {
      dispatchReciprocalExchange({
        visible: true,
        offer: offer!,
        type: "current",
      })
      requestAnimationFrame(() => {
        dispatchBallonOffer({ visible: false })
      })
      return
    }
  }

  function handlePay() {
    if (!userId) {
      dispatchAuthModal({
        visible: true,
        type: "SignIn",
      })
      requestAnimationFrame(() => {
        dispatchBallonOffer({ visible: false })
      })
      return
    } else if (!!userId && userId !== offer?.userId) {
      handlePush(`/messages?offer-pay=${offer?.id}:${offer?.userId}`)
      requestAnimationFrame(() => {
        dispatchBallonOffer({ visible: false })
      })
      return
    }
  }

  return (
    <div className={cx("wrapper-fixed", styles.wrapper, common.wrapper)} data-visible={visible}>
      <section data-section-modal>
        <header data-color={EnumTypeProvider.offer}>
          <div data-category-img>{offer?.categoryId ? <ImageCategory id={offer?.categoryId!} /> : null}</div>
          <h3>{categoryCurrent?.title}</h3>
        </header>
        <ButtonClose position={{}} onClick={() => dispatchBallonOffer({ visible: false })} />
        <div data-container>
          <ProfileComponent offer={offer as unknown as IResponseOffers} />
          <ItemDescriptions offer={offer as unknown as IResponseOffers} />
          {disabledReply && !isLoadingExecutedBarter && !isLoadingInitiatedBarter && userId !== offer?.userId ? (
            <div data-inform-off-barter>
              <article>
                <span>
                  {disabledReply === "executed-have"
                    ? "В настоящий момент у вас идет обмен с данным пользователем. Когда он закончится, вы сможете создать новое предложение обмена"
                    : disabledReply === "initiated-have"
                    ? "Вы уже отправили данному пользователю свое предложение"
                    : null}
                </span>
              </article>
            </div>
          ) : null}
          <GeoData offer={offer as unknown as IResponseOffers} />
          <div data-buttons>
            <Button
              type="button"
              typeButton="fill-primary"
              label="Откликнуться"
              onClick={handle}
              loading={isLoadingExecutedBarter || isLoadingInitiatedBarter}
              disabled={(!!userId && userId === offer?.userId) || !!disabledReply}
            />
            <Button
              type="button"
              typeButton="regular-primary"
              label="Заплатить"
              onClick={handlePay}
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
