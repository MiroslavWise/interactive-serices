"use client"

import { useEffect, useMemo, useState } from "react"

import { List } from "./components/List"
import { SearchBlock } from "./components/SearchBlock"

import { useAuth } from "@/store"
import { useWebSocket } from "@/context"
import { getMillisecond, useCountMessagesNotReading, useResize } from "@/helpers"

export const ListChat = () => {
  const { isTablet } = useResize()
  const [search, setSearch] = useState("")
  const { socket } = useWebSocket() ?? {}
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const { data, refetchCountMessages } = useCountMessagesNotReading()

  const itemsProvider = useMemo(() => data?.res || [], [data?.res])

  const items = useMemo(() => {
    const ITEMS = itemsProvider
    ITEMS.sort((prev, next) => {
      const prevNumber = prev.messages?.[0]?.created! ? getMillisecond(prev.messages?.[0]?.created!) : getMillisecond(prev?.created!)
      const nextNumber = next.messages?.[0]?.created! ? getMillisecond(next.messages?.[0]?.created!) : getMillisecond(next?.created!)
      return nextNumber - prevNumber
    })

    return ITEMS
  }, [itemsProvider])

  useEffect(() => {
    function chatResponse(event: any) {
      refetchCountMessages()
    }

    if (userId && socket) {
      socket?.on(`chatResponse-${userId}`, chatResponse)
    }

    return () => {
      socket?.off(`chatResponse-${userId}`, chatResponse)
    }
  }, [socket, userId])

  return (
    <section
      className={
        isTablet ? "w-full h-full z-[3]" : "w-full h-full rounded-[1.25rem] bg-[var(--BG-second)] z-[1] overflow-hidden flex flex-col"
      }
    >
      {!isTablet ? (
        <>
          <header className="p-3 sticky top-0 w-full flex flex-row justify-center items-center gap-4 bg-[var(--BG-second)] z-[2] border-b border-[var(--grey-stroke)]">
            <div data-total-number className="inline-flex items-center w-min gap-2">
              <h4 className="text-base font-semibold not-italic color text-[var(--text-primary)]">Сообщения</h4>
            </div>
          </header>
          <SearchBlock {...{ search, setSearch }} />
        </>
      ) : null}
      <List search={search} items={items} />
    </section>
  )
}
