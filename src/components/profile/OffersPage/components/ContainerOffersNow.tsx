"use client"

import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"
import type { TContainerOffersNow } from "./types/types"

import { LoadingBarters } from "@/components/common"
import { CardOffer } from "@/components/common/Card/Offer"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { getBarterUserIdReceiver } from "@/services"

import styles from "./styles/style.module.scss"

export const ContainerOffersNow: TContainerOffersNow = ({ dispatch }) => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { data, refetch, isLoading } = useQuery({
    queryFn: () =>
      getBarterUserIdReceiver(userId!, {
        status: EnumStatusBarter.INITIATED,
        order: "DESC",
      }),
    queryKey: ["barters", { receiver: userId, status: EnumStatusBarter.INITIATED }],
  })

  useEffect(() => {
    if (data?.data) {
      dispatch({ total: data?.data?.length || 0 })
    }
  }, [data?.data])

  return (
    <section className={cx(styles.containerOffersNow, "w-full h-full z-[3]")}>
      <ul className="w-full grid gap-4 grid-cols-2 pb-5 overflow-y-auto z-[3] max-md:h-full max-md:flex max-md:flex-col max-md:gap-3 max-md:overflow-y-visible">
        {isLoading
          ? [1, 2, 3].map((_) => <LoadingBarters key={`::item::load${_}::`} />)
          : Array.isArray(data?.data) &&
            data?.data.map((item) => <CardOffer key={`${item.id}-offer-page-${item.provider}`} {...item} refetch={refetch} />)}
      </ul>
    </section>
  )
}
