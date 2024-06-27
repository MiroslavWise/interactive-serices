"use client"

import { getMillisecond, useCountMessagesNotReading } from "@/helpers"
import { useChatContext } from "./ContextChats"
import { useMemo } from "react"
import Link from "next/link"

function ListMessages({ id }: { id: string | number }) {
  console.log("ListMessages id: ", id)
  const { search, navigate } = useChatContext()

  const { data } = useCountMessagesNotReading()

  const items = data?.res || []

  const filters = useMemo(() => {
    const ITEMS = items
    ITEMS.sort((prev, next) => {
      const prevNumber = prev.messages?.[0]?.created! ? getMillisecond(prev.messages?.[0]?.created!) : getMillisecond(prev?.created!)
      const nextNumber = next.messages?.[0]?.created! ? getMillisecond(next.messages?.[0]?.created!) : getMillisecond(next?.created!)
      return nextNumber - prevNumber
    })

    return ITEMS
  }, [items])

  return (
    <ul className="w-full p-0.625 overflow-x-hidden overflow-y-scroll">
      {filters.map((item) => (
        <Link key={`::key::chat::${item.id}::`} href={{ pathname: `/chat/${item.id}` }}
          className=""
        >

        </Link>
      ))}
    </ul>
  )
}

ListMessages.displayName = "ListMessages"
export default ListMessages
