"use client"

import { useQuery } from "@tanstack/react-query"

import type { TSentenceCards } from "./types/types"

import { LoadingBarters } from "@/components/common"
import { CardOffer } from "@/components/common/Card/Offer"

import { useAuth } from "@/store"
import { serviceBarters } from "@/services"

import styles from "./styles/style.module.scss"

export const SentenceCards: TSentenceCards = ({ value }) => {
  const userId = useAuth(({ userId }) => userId)
  const { data, isLoading } = useQuery({
    queryFn: () =>
      serviceBarters.get({
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
      ) : Array.isArray(data?.res) ? (
        data?.res?.map((item) => <CardOffer key={`::history::page::${item.status}::${item.id}::`} {...item} />)
      ) : (
        <p>
          {value.value === "executed"
            ? "У вас нет текущих предложений"
            : value.value === "completed"
            ? "У вас нет заверешённых предложений"
            : null}
        </p>
      )}
    </ul>
  )
}
