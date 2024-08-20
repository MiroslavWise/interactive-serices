"use client"

import { useQuery } from "@tanstack/react-query"

import { getComplains } from "@/services"
import { formatOfMMM } from "@/helpers"
import { EnumTypeProvider } from "@/types/enum"

const titleMap: Map<EnumTypeProvider, string> = new Map([
  [EnumTypeProvider.profile, "Жалоба на пользователя"],
  [EnumTypeProvider.offer, "Жалоба на услугу"],
])

const onTitle = (value: EnumTypeProvider) => (titleMap.has(value) ? titleMap.get(value) : null)

export default () => {
  const { data, isLoading } = useQuery({
    queryFn: () => getComplains({ query: { order: "DESC" } }),
    queryKey: ["complains"],
  })

  const items = data?.data || []

  console.log("items: ", items)

  return (
    <section className="w-full pt-6 max-h-[calc(100vh_-_var(--height-header-nav-bar)] h-min -mt-6 not-y-scroll grid grid-cols-5 gap-3 px-6 items-start justify-start overflow-y-auto">
      {items.map((item) => (
        <li
          key={`:key:complain:${item.id}:`}
          className="w-full rounded-2xl border border-solid border-grey-stroke-light p-3 flex flex-col gap-3 bg-BG-second cursor-pointer h-min overflow-hidden"
        >
          <div className="w-full flex flex-row items-center justify-between gap-3">
            <time className="text-text-secondary text-xs font-normal">{formatOfMMM(item?.created)}</time>
          </div>
          <h3 className="text-text-primary text-base font-semibold">{onTitle(item.provider)}</h3>
          <p className="text-text-primary text-sm font-normal">
            Причина: <span className="text-text-secondary">{item.message}</span>
          </p>
        </li>
      ))}
    </section>
  )
}
