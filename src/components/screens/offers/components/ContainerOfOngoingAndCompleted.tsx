import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"

import { EnumStatusBarter } from "@/types/enum"

import { CardBarter, LoadingBarters, Segments } from "@/components/common"

import { useAuth } from "@/store"
import { getBarters } from "@/services"
import { SEGMENTS } from "../constants/segments"

const emptyDescription: Map<EnumStatusBarter, string> = new Map([
  [
    EnumStatusBarter.EXECUTED,
    "Сейчас у вас нет текущих обменов. Они появятся, когда вы откликнетесь на предложение или создадите своё и вам предложат обмен",
  ],
  [EnumStatusBarter.COMPLETED, "У вас нет завершённых предложений, появится, когда вы завершите обмен"],
])
export const ContainerOfOngoingAndCompleted = () => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [active, setActive] = useState(SEGMENTS[0])

  const { data, isLoading } = useQuery({
    queryFn: () =>
      getBarters({
        status: active.value,
        user: userId!,
        order: "DESC",
      }),
    queryKey: ["barters", { userId: userId, status: active.value }],
    enabled: !!userId,
  })

  const count = useMemo(() => {
    if (!data?.data) return null

    return data?.data?.length || 0
  }, [data?.data])

  return (
    <section className="w-full flex flex-col gap-2.5">
      <Segments VALUES={SEGMENTS} active={active} setActive={setActive} isBorder />
      {count ? <span className="text-text-secondary text-sm font-medium">{count} обмена</span> : null}
      {isLoading ? (
        [1, 2, 3].map((item) => <LoadingBarters key={`::item::load::barter::${item}::`} />)
      ) : count ? (
        data?.data?.map((item) => <CardBarter key={`::key::item::barter::`} barter={item} />)
      ) : (
        <p className="text-text-primary text-sm font-normal">
          {emptyDescription.has(active.value) ? emptyDescription.get(active.value) : null}
        </p>
      )}
    </section>
  )
}
