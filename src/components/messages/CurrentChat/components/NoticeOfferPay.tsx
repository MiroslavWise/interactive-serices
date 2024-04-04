"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { IResponseThread } from "@/services/threads/types"
import type { IUserResponse } from "@/services/users/types"

import { LoadingThreadNotice } from "@/components/common"

import { getIdOffer } from "@/services"
import { daysAgo, usePush } from "@/helpers"
import { dispatchBallonOffer, dispatchMapCoordinates, dispatchModal, EModalData, useAuth, useOffersCategories } from "@/store"

import styles from "./styles/notice-offer-pay.module.scss"

export const NoticeOfferPay = ({ thread, userData }: { thread: IResponseThread; userData: IUserResponse }) => {
  const userId = useAuth(({ userId }) => userId)
  const categories = useOffersCategories(({ categories }) => categories)
  const { handlePush } = usePush()
  const { data, isLoading } = useQuery({
    queryFn: () => getIdOffer(thread?.offerId!),
    queryKey: ["offers", { offerId: thread?.offerId! }],
    enabled: !!thread?.offerId,
  })

  const { res: resOffer } = data ?? {}

  const category = useMemo(() => {
    if (!categories || !resOffer) return null

    return categories?.find((item) => item.id === resOffer?.categoryId)!
  }, [categories, resOffer])

  function handleToMap() {
    if (!!resOffer) {
      const [address] = resOffer?.addresses

      if (address) {
        dispatchMapCoordinates({
          coordinates: address?.coordinates?.split(" ")?.map(Number),
        })
      }
      dispatchBallonOffer({ offer: resOffer })
      dispatchModal(EModalData.BalloonOffer)
      handlePush("/")
    }
  }

  function handleDetailOffer() {
    if (!!resOffer) {
      dispatchBallonOffer({ offer: resOffer })
      dispatchModal(EModalData.BalloonOffer)
    }
  }

  if (isLoading) {
    return <LoadingThreadNotice />
  }

  return (
    <section className={styles.wrapper}>
      <article>
        <div data-head>
          <div data-time>
            <div data-img>
              <img src="/svg/clock-fast-forward.svg" alt="clock" width={16} height={16} />
            </div>
            <time>{daysAgo(thread?.created)}</time>
          </div>
        </div>
        <p>
          {userId === resOffer?.userId ? (
            <>
              {userData?.profile?.firstName || ""} заинтересована в покупке вашей услуги{" "}
              <span onClick={handleDetailOffer}>{category?.title}</span>. Договоритесь о цене и условиях покупки в чате
            </>
          ) : (
            <>
              Вы предлагаете заплатить за услугу {category ? <span onClick={handleDetailOffer}>{category.title}</span> : null}. Договоритесь
              о цене и условиях покупки в чате.
            </>
          )}
        </p>
        {userId !== resOffer?.userId ? (
          <p>
            Вернитесь к <span onClick={handleToMap}>карточке</span> услуги, чтобы предложить обмен.
          </p>
        ) : null}
      </article>
    </section>
  )
}
