"use client"

import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"
import type { TContainerOffersNow } from "./types/types"

import { LoadingBarters } from "@/components/common"
import { CardOffer } from "@/components/common/Card/Offer"

import { useAuth_ } from "@/store"
import { getBarterUserIdReceiver } from "@/services"

import styles from "./styles/style.module.scss"

export const ContainerOffersNow: TContainerOffersNow = ({ dispatch }) => {
  const { id: userId } = useAuth_(({ auth }) => auth) ?? {}
  const { data, refetch, isLoading } = useQuery({
    queryFn: () =>
      getBarterUserIdReceiver(userId!, {
        status: EnumStatusBarter.INITIATED,
        order: "DESC",
      }),
    queryKey: ["barters", { receiver: userId, status: EnumStatusBarter.INITIATED }],
  })

  useEffect(() => {
    if (data?.ok) {
      dispatch({ total: data?.res?.length || 0 })
    }
  }, [data])

  return (
    <section className={styles.containerOffersNow}>
      <ul>
        {isLoading
          ? [1, 2, 3].map((_) => <LoadingBarters key={`::item::load${_}::`} />)
          : Array.isArray(data?.res) &&
            data?.res.map((item) => <CardOffer key={`${item.id}-offer-page-${item.provider}`} {...item} refetch={refetch} />)}
      </ul>
    </section>
  )
}
