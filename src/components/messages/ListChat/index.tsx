"use client"

import { useEffect, useMemo, useState } from "react"

import { List } from "./components/List"
import { SearchBlock } from "./components/SearchBlock"

import { useAuth_ } from "@/store"
import { useWebSocket } from "@/context"
import { getMillisecond, useCountMessagesNotReading, useResize } from "@/helpers"

import styles from "./styles/style.module.scss"

export const ListChat = () => {
  const { isTablet } = useResize()
  const [search, setSearch] = useState("")
  const { socket } = useWebSocket() ?? {}
  const { id: userId } = useAuth_(({ auth }) => auth) ?? {}

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
    <section className={isTablet ? styles.containerMobile : styles.container}>
      {!isTablet ? (
        <>
          <header>
            <div data-total-number>
              <h4>Сообщения</h4>
            </div>
          </header>
          <SearchBlock {...{ search, setSearch }} />
        </>
      ) : null}
      <List search={search} items={items} />
    </section>
  )
}
