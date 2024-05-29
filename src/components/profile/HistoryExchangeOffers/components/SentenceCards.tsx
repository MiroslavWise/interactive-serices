"use client"

import { useQuery } from "@tanstack/react-query"

import type { TSentenceCards } from "./types/types"

import { CardBarter, LoadingBarters } from "@/components/common"

import { useAuth_ } from "@/store"
import { getBarters } from "@/services"

import styles from "./styles/style.module.scss"

export const SentenceCards: TSentenceCards = ({ value }) => {
  const { id: userId } = useAuth_(({ auth }) => auth) ?? {}
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
        data?.res?.map((item) => <CardBarter key={`::history::page::${item.status}::${item.id}::`} barter={item} />)
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
