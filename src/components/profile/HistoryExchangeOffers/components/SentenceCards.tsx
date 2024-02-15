"use client"

import { useQuery } from "@tanstack/react-query"

import type { TSentenceCards } from "./types/types"

import { LoadingBarters } from "@/components/common"
import { CardOffer } from "@/components/common/Card/Offer"

import { useAuth } from "@/store"
import { getBarters } from "@/services"

import styles from "./styles/style.module.scss"

export const SentenceCards: TSentenceCards = ({ value }) => {
  const userId = useAuth(({ userId }) => userId)
  const { data, isLoading } = useQuery({
    queryFn: () =>
      getBarters({
        status: value.value,
        user: userId!,
        order: "DESC",
      }),
    queryKey: ["barters", { userId: userId, status: value.value }],
    enabled: !!userId,
  })

  return (
    <ul className={styles.containerCards}>
      {isLoading ? (
        [1, 2, 3].map((item) => <LoadingBarters key={`::item::load::barter::${item}::`} />)
      ) : data?.res && Array.isArray(data?.res) && data?.res?.length > 0 ? (
        data?.res?.map((item) => <CardOffer key={`::history::page::${item.status}::${item.id}::`} {...item} />)
      ) : (
        <p>
          {value.value === "executed"
            ? "Сейчас у вас нет текущих обменов. Они появятся, когда вы откликнетесь на предложение или создадите своё и вам предложат обмен"
            : value.value === "completed"
            ? "У вас нет завершённых предложений, появится, когда вы завершите обмен"
            : null}
        </p>
      )}
    </ul>
  )
}
