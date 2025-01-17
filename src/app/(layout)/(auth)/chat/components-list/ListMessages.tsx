"use client"

import { memo, useMemo } from "react"

import { EnumProviderThreads } from "@/types/enum"

import LoadingItem from "./LoadingItem"
import ItemMessageChat from "./ItemMessageChat"

import { getMillisecond, useCountMessagesNotReading } from "@/helpers"

function ListMessages() {
  const { data, isLoading } = useCountMessagesNotReading()

  const items = data || []

  const filters = useMemo(() => {
    const ITEMS = []
    for (const item of items) {
      if (item.provider === EnumProviderThreads.PERSONAL) {
        if (item.messages.length > 0) {
          ITEMS.push(item)
        }
      } else {
        ITEMS.push(item)
      }
    }
    ITEMS.sort((prev, next) => {
      const prevNumber = prev.messages?.length > 0 ? getMillisecond(prev.messages?.[0]?.created!) : getMillisecond(prev?.created!)
      const nextNumber = next.messages?.length > 0 ? getMillisecond(next.messages?.[0]?.created!) : getMillisecond(next?.created!)
      return nextNumber - prevNumber
    })

    return ITEMS
  }, [items])

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
      className="w-full p-2.5 h-fit overflow-y-scroll flex flex-col gap-0.5 max-md:pb-[--height-mobile-footer-nav] max-md:max-h-[calc(100dvh_-_var(--height-mobile-header))]"
      key={`screen-chats`}
    >
      {filters.map((item) => (
        <ItemMessageChat key={`::key::item::chat::${item.id}::`} item={item} />
      ))}
    </ul>
  )
}

ListMessages.displayName = "ListMessages"
export default memo(ListMessages)
