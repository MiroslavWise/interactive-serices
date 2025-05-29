"use client"

import { useQuery } from "@tanstack/react-query"

import { type TSentenceCards } from "./types/types"

import { CardBarter, LoadingBarters } from "@/components/common"

import { useAuth } from "@/store"
import { getBarters } from "@/services"

export const SentenceCards: TSentenceCards = ({ value }) => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
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
    <ul className="w-full flex flex-col gap-4 h-full overflow-y-auto px-5 pb-5">
      {isLoading ? (
        [1, 2, 3].map((item) => <LoadingBarters key={`::item::load::barter::${item}::`} />)
      ) : data?.data && Array.isArray(data?.data) && data?.data?.length > 0 ? (
        data?.data?.map((item) => <CardBarter key={`::history::page::${item.status}::${item.id}::`} barter={item} />)
      ) : (
        <p className="text-text-primary text-start text-sm font-normal">
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
