"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"

import { useChatContext } from "./ContextChats"
import ItemMessageChat from "./ItemMessageChat"

import { getMillisecond, useCountMessagesNotReading } from "@/helpers"

function ListMessages() {
  const params = useParams()
  const { id } = (params as { id?: string | number }) ?? {}

  const { search, navigate } = useChatContext()

  const { data } = useCountMessagesNotReading()

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
    if (navigate === "all") return filters

    return filters.filter((_) => _.provider === navigate)
  }, [navigate, filters])

  return (
    <ul className="w-full p-0.625 overflow-x-hidden overflow-y-scroll flex flex-col gap-0.125">
      {filterNavigate.map((item) => (
        <ItemMessageChat key={`::key::item::chat::${item.id}::`} item={item} />
      ))}
    </ul>
  )
}

ListMessages.displayName = "ListMessages"
export default ListMessages
