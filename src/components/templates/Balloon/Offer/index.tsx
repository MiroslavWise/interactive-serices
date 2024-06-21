"use client"

import Link from "next/link"
import { useEffect, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button, ImageCategory } from "@/components/common"

import { IResponseOffers } from "@/services/offers/types"
import { EnumStatusBarter, EnumTypeProvider } from "@/types/enum"

import { ItemDescriptions } from "./components/ItemDescriptions"
import { ProfileComponent } from "../components/ProfileComponent"
import GeoData from "@/components/common/Card/CardBallon/components/GeoData"

import { usePush } from "@/helpers"
import { getBarters } from "@/services"
import { dispatchAuthModal, dispatchBallonOffer, dispatchModalClose, dispatchReciprocalExchange, useAuth, useBalloonOffer } from "@/store"

export default function BalloonOffer() {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const offer = useBalloonOffer(({ offer }) => offer)
  const { handlePush } = usePush()

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
    enabled: !!userId && !!offer && userId !== offer?.userId,
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
    enabled: !!userId && !!offer && userId !== offer?.userId,
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
      return dispatchAuthModal({
        visible: true,
        type: "SignIn",
      })
    } else if (!!userId && userId !== offer?.userId) {
      return dispatchReciprocalExchange({
        visible: true,
        offer: offer!,
        type: "current",
      })
    }
  }

  function handlePay() {
    if (!userId) {
      dispatchAuthModal({
        visible: true,
        type: "SignIn",
      })
      dispatchModalClose()
      return
    } else if (!!userId && userId !== offer?.userId) {
      handlePush(`/messages?offer-pay=${offer?.id}:${offer?.userId}`)
      dispatchModalClose()
      return
    }
  }

  useEffect(() => {
    return () => dispatchBallonOffer({ offer: undefined })
  }, [])

  return (
    <>
      <header data-color={EnumTypeProvider.offer}>
        <div data-category-img>{offer?.categoryId ? <ImageCategory id={offer?.categoryId!} /> : null}</div>
        <h3>{offer?.category?.title}</h3>
      </header>
      <div data-container>
        <div data-container-children>
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
                className="relative w-11 h-11 p-[1.375rem] rounded-[1.375rem] bg-[var(--btn-second-default)]"
                data-circle
                href={{ pathname: "/messages", query: { user: offer?.userId } }}
                onClick={dispatchModalClose}
              >
                <img
                  className="absolute top-1/2 left-1/2 w-6 h-6 -translate-y-1/2 -translate-x-1/2"
                  src="/svg/message-dots-circle-primary.svg"
                  alt="chat"
                  width={20}
                  height={20}
                />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}
