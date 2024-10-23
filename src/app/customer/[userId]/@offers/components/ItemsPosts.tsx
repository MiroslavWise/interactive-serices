"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"

import ItemPost from "./ItemPost"

import { cx } from "@/lib/cx"
import { getPosts } from "@/services/posts"
import { nameTitle } from "@/lib/names"

const NAV: { value: boolean; label: string }[] = [
  {
    label: "Активные",
    value: false,
  },
  {
    label: "В архиве",
    value: true,
  },
]

function ItemsPosts({ id }: { id: number }) {
  const [archive, setArchive] = useState(false)

  const { data, isLoading } = useQuery({
    queryFn: () => getPosts({ order: "DESC", archive: archive ? 1 : 0, user: id }),
    queryKey: ["posts", { userId: id, order: "DESC", archive: archive }],
  })
  const items = data?.data || []
  const length = items.length

  return (
    <section className={`w-full h-full flex flex-col gap-2.5 ${!length && "items-center justify-center"}`}>
      <nav className="w-full border-b border-solid border-grey-stroke flex flex-row justify-start gap-[1.125rem]">
        {NAV.map((item) => (
          <a
            key={`:NAV:${item.value}`}
            className={cx(
              "w-fit pb-1 border-b-2 border-solid cursor-pointer",
              item.value === archive ? "border-text-accent" : "border-transparent",
            )}
            onClick={() => setArchive(item.value)}
          >
            <span className={cx("text-sm font-medium", item.value === archive ? "text-text-accent" : "text-text-secondary")}>
              {item.label}
            </span>
          </a>
        ))}
      </nav>
      {length ? (
        <>
          <p className="text-text-secondary text-[0.8125rem] leading-[1.125rem] font-normal">
            {length}&nbsp;{nameTitle(length, EnumTypeProvider.POST)}
          </p>
          <ul className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
            {items.map((item) => (
              <ItemPost key={`:key:item:post:${item.id}:`} post={item} />
            ))}
          </ul>
        </>
      ) : (
        <p className="text-text-primary text-sm font-normal whitespace-nowrap mt-10">
          {archive ? "Архивированных" : "Активных"} постов нет
        </p>
      )}
    </section>
  )
}

ItemsPosts.displayName = "ItemsPosts"
export default ItemsPosts
