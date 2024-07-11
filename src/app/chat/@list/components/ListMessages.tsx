"use client"

import { useMemo } from "react"

import LoadingItem from "./LoadingItem"
import ItemMessageChat from "./ItemMessageChat"

import { cx } from "@/lib/cx"
import { useSelectChat } from "@/store"
import { getMillisecond, useCountMessagesNotReading } from "@/helpers"

function ListMessages() {
  const select = useSelectChat(({ select }) => select)
  const { data, isLoading } = useCountMessagesNotReading()

  const items = data || []

  const filters = useMemo(() => {
    const ITEMS = items
    ITEMS.sort((prev, next) => {
      const prevNumber = prev.messages?.[0]?.created! ? getMillisecond(prev.messages?.[0]?.created!) : getMillisecond(prev?.created!)
      const nextNumber = next.messages?.[0]?.created! ? getMillisecond(next.messages?.[0]?.created!) : getMillisecond(next?.created!)
      return nextNumber - prevNumber
    })

    return ITEMS
  }, [items])

  const filterNavigate = useMemo(() => {
    if (select === "all") return filters

    return filters.filter((_) => _.provider === select)
  }, [select, filters])

  // const filtersSearch = useMemo(() => {
  //   const trimLower = search.trim().toLowerCase()
  //   if (!trimLower) return filterNavigate

  //   return filterNavigate

  // }, [filterNavigate, search])

  if (isLoading)
    return (
      <ul className="w-full p-2.5 overflow-x-hidden overflow-y-scroll flex flex-col loading-screen" key={`screen-load`}>
        {[123, 123442125, 341123, 123, 412341, 512341, 1345, 12341, 21323, 656784, 125, 1372, 341, 234].map((item) => (
          <LoadingItem key={`::key::${item}::${item}::l::message::`} />
        ))}
      </ul>
    )

  return (
    <ul
      className={cx(
        "w-full p-2.5 overflow-x-hidden overflow-y-scroll flex flex-col gap-0.5",
        "max-md:pb-[var(--height-mobile-footer-nav)] max-md:max-h-[calc(100vh_-_var(--height-mobile-header))_-_6.125rem]",
      )}
      key={`screen-chats`}
    >
      {filterNavigate.map((item) => (
        <ItemMessageChat key={`::key::item::chat::${item.id}::`} item={item} />
      ))}
    </ul>
  )
}

ListMessages.displayName = "ListMessages"
export default ListMessages
