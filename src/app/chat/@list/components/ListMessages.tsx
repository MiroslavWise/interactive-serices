"use client"

import { useMemo } from "react"

import ItemMessageChat from "./ItemMessageChat"

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

  if (isLoading)
    return (
      <ul className="w-full p-2.5 overflow-x-hidden overflow-y-scroll flex flex-col loading-screen" key={`screen-load`}>
        {[123, 123442125, 341123, 123, 412341, 512341, 1345, 12341, 21323, 656784, 125, 1372, 341, 234].map((item) => (
          <li
            key={`::key::${item}::${item}::l::message::`}
            className="p-2.5 w-full items-center grid grid-cols-[3.25rem_minmax(0,1fr)] gap-2.5"
          >
            <span className="w-[3.25rem] h-[3.25rem] rounded-full" />
            <article className="w-full flex flex-col gap-2 *:w-full *:h-4 *:rounded-lg">
              <span />
              <span className="max-w-[70%]" />
              <span />
            </article>
          </li>
        ))}
      </ul>
    )

  return (
    <ul
      className="w-full p-2.5 overflow-x-hidden overflow-y-scroll flex flex-col gap-0.5 max-md:pb-[var(--height-mobile-footer-nav)]"
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
