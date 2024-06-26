"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { memo, useState, useMemo, useEffect } from "react"
import { useQueries, useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"
import { IUserOffer } from "@/services/offers/types"
import type { IBarterResponse } from "@/services/barters/types"

import { Button, LoadingThreadNotice, NextImageMotion } from "@/components/common"

import { useWebSocket } from "@/context"
import { useAuth, dispatchBallonOffer } from "@/store"
import { daysAgo, useCountMessagesNotReading, usePush } from "@/helpers"
import { serviceProfile, getBarterUserIdReceiver, getBarterId, patchBarter, patchThread, getOffersCategories } from "@/services"

import styles from "./styles/notice-barter.module.scss"

export const NoticeBarter = memo(function NoticeBarter({ idBarter, user: userEnemy }: { idBarter: number; user: IUserOffer }) {
  const threadId = useSearchParams().get("thread")
  const user = useAuth(({ user }) => user)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { data: c } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = c?.res || []
  const [loading, setLoading] = useState(false)
  const { socket } = useWebSocket()
  const { handleReplace } = usePush()
  const [stateBarter, setStateBarter] = useState<IBarterResponse | null>(null)
  const { refetchCountMessages } = useCountMessagesNotReading()

  const { refetch: refetchBarters } = useQuery({
    queryFn: () =>
      getBarterUserIdReceiver(userId!, {
        status: EnumStatusBarter.INITIATED,
        order: "DESC",
      }),
    queryKey: ["barters", { receiver: userId, status: EnumStatusBarter.INITIATED }],
    enabled: false,
  })

  const { data, isLoading } = useQuery({
    queryFn: () => getBarterId(idBarter),
    queryKey: ["barters", { id: idBarter }],
    enabled: !!idBarter,
    refetchOnMount: true,
    refetchOnReconnect: true,
  })

  const { res, ok } = data ?? {}
  const { status, consigner, initiator } = stateBarter ?? {}

  const [{ data: dataInitiatorProfile }, { data: dataConsignerProfile }] = useQueries({
    queries: [
      {
        queryFn: () => serviceProfile.getUserId(initiator?.userId!),
        queryKey: ["profile", initiator?.userId!],
        enabled: ok && [EnumStatusBarter.EXECUTED, EnumStatusBarter.COMPLETED].includes(status!),
      },
      {
        queryFn: () => serviceProfile.getUserId(consigner?.userId!),
        queryKey: ["profile", consigner?.userId!],
        enabled: ok && [EnumStatusBarter.EXECUTED, EnumStatusBarter.COMPLETED].includes(status!),
      },
    ],
  })

  useEffect(() => {
    if (!!res) {
      setStateBarter(res)
    }
  }, [res])

  const infoOffers = useMemo(() => {
    if (!categories.length || !consigner || !initiator) {
      return null
    }
    return {
      initiator: categories?.find((item) => Number(item.id) === Number(initiator?.categoryId)),
      consigner: categories?.find((item) => Number(item.id) === Number(consigner?.categoryId)),
    }
  }, [categories, consigner, initiator])

  function handleAccept() {
    if (!loading) {
      setLoading(true)
      patchBarter({ status: EnumStatusBarter.EXECUTED }, idBarter!).then((response) => {
        if (response.ok) {
          const date = new Date()
          const receiverIds = [Number(userEnemy?.id)]
          const message = `Пользователь ${user?.profile?.username} согласился принять ваш запрос на обмен!`
          socket?.emit("barter", {
            receiverIds: receiverIds,
            message: message,
            barterId: idBarter,
            emitterId: userId!,
            status: "accepted",
            threadId: threadId!,
            created: date,
          })
          refetchBarters()
        }
        requestAnimationFrame(() => {
          setStateBarter((prev) => ({
            ...prev!,
            status: EnumStatusBarter.EXECUTED,
          }))
          setLoading(false)
        })
      })
    }
  }

  function handleRejection() {
    if (!loading) {
      setLoading(true)
      Promise.all([
        patchBarter({ status: EnumStatusBarter.CANCELED, enabled: false }, idBarter!),
        patchThread({ enabled: false }, Number(threadId)),
      ]).then(() => {
        Promise.all([refetchBarters(), refetchCountMessages()]).then(() => {
          setTimeout(() => {
            setLoading(false)
            handleReplace("/messages")
          })
        })
      })
    }
  }

  return isLoading ? (
    <LoadingThreadNotice />
  ) : data?.ok ? (
    <section className={styles.wrapper} data-type={status}>
      <article>
        {status === EnumStatusBarter.EXECUTED ? (
          <>
            <div data-lath>
              <span>В процессе</span>
            </div>
            <div data-barter-people>
              <div data-item-people-offer>
                <div data-img>
                  <NextImageMotion src={dataInitiatorProfile?.res?.image?.attributes?.url!} alt="avatar" width={44} height={44} />
                </div>
                <a
                  onClick={(event) => {
                    event.stopPropagation()
                    dispatchBallonOffer({ offer: initiator! })
                  }}
                >
                  {infoOffers?.initiator?.title}
                </a>
              </div>
              <div data-repeat>
                <img src="/svg/repeat-gray.svg" alt="repeat" width={16} height={16} />
              </div>
              <div data-item-people-offer>
                <div data-img>
                  <NextImageMotion src={dataConsignerProfile?.res?.image?.attributes?.url!} alt="avatar" width={44} height={44} />
                </div>
                <a
                  onClick={(event) => {
                    event.stopPropagation()
                    dispatchBallonOffer({ offer: consigner! })
                  }}
                >
                  {infoOffers?.consigner?.title}
                </a>
              </div>
            </div>
          </>
        ) : (
          <div data-head>
            <div data-time>
              <div data-img>
                <img src="/svg/clock-fast-forward.svg" alt="clock" width={16} height={16} />
              </div>
              <time>{daysAgo(res?.created)}</time>
            </div>
          </div>
        )}
        {[EnumStatusBarter.INITIATED, EnumStatusBarter.COMPLETED].includes(status!) ? (
          <p>
            {initiator?.userId === userId ? (
              <>
                Вы предлагаете&nbsp;
                <span
                  onClick={(event) => {
                    event.stopPropagation()
                    dispatchBallonOffer({ offer: initiator! })
                  }}
                >
                  {infoOffers?.initiator?.title?.toLowerCase()}
                </span>
                &nbsp;взамен на&nbsp;
                <span
                  onClick={(event) => {
                    event.stopPropagation()
                    dispatchBallonOffer({ offer: consigner! })
                  }}
                >
                  {infoOffers?.consigner?.title?.toLowerCase()}
                </span>
                : «{data?.res?.consigner?.title}».
              </>
            ) : consigner?.userId === userId ? (
              <>
                <Link href={{ pathname: `/customer/${dataInitiatorProfile?.res?.id}` }}>{dataInitiatorProfile?.res?.firstName}</Link>
                &nbsp;предлагает вам&nbsp;
                <span
                  onClick={(event) => {
                    event.stopPropagation()
                    dispatchBallonOffer({ offer: initiator! })
                  }}
                >
                  {infoOffers?.initiator?.title?.toLowerCase()}
                </span>
                &nbsp;взамен на&nbsp;
                <span
                  onClick={(event) => {
                    event.stopPropagation()
                    dispatchBallonOffer({ offer: consigner! })
                  }}
                >
                  {infoOffers?.consigner?.title?.toLowerCase()}
                </span>
                : «{data?.res?.initiator?.title}».
              </>
            ) : null}
          </p>
        ) : null}
      </article>
      {status !== EnumStatusBarter.EXECUTED ? (
        <footer>
          {status === EnumStatusBarter.INITIATED && res?.consigner?.userId === userId ? (
            <>
              <Button
                type="button"
                typeButton="white"
                label="Принять"
                loading={loading}
                onClick={(event) => {
                  event.stopPropagation()
                  handleAccept()
                }}
              />
              <Button
                type="button"
                typeButton="fill-opacity"
                label="Отказаться"
                loading={loading}
                onClick={(event) => {
                  event.stopPropagation()
                  handleRejection()
                }}
              />
            </>
          ) : null}
        </footer>
      ) : null}
    </section>
  ) : null
})
