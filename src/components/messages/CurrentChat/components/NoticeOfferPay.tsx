"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { IUserOffer } from "@/services/offers/types"
import type { IResponseThread } from "@/services/threads/types"

import { LoadingThreadNotice } from "@/components/common"

import { daysAgo } from "@/helpers"
import { getIdOffer, getOffersCategories } from "@/services"
import { dispatchBallonOffer, dispatchModal, EModalData, useAuth } from "@/store"

import styles from "./styles/notice-offer-pay.module.scss"

export const NoticeOfferPay = ({ thread, user }: { thread: IResponseThread; user: IUserOffer }) => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { data: c } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = c?.res || []
  const { firstName } = user ?? {}
  const { data, isLoading } = useQuery({
    queryFn: () => getIdOffer(thread?.offerId!),
    queryKey: ["offers", { offerId: thread?.offerId! }],
    enabled: !!thread?.offerId,
  })

  const { data: resOffer } = data ?? {}

  const category = useMemo(() => {
    if (!categories || !resOffer) return null

    return categories?.find((item) => item.id === resOffer?.categoryId)!
  }, [categories, resOffer])

  function handleDetailOffer() {
    if (!!resOffer) {
      dispatchBallonOffer({ offer: resOffer })
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
              {firstName || ""} заинтересована в покупке вашей услуги <span onClick={handleDetailOffer}>{category?.title}</span>.
              Договоритесь о цене и условиях покупки в чате
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
            Вернитесь к <span onClick={handleDetailOffer}>карточке</span> услуги, чтобы предложить обмен.
          </p>
        ) : null}
      </article>
    </section>
  )
}
