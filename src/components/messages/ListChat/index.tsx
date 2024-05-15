"use client"

import { useQueries } from "@tanstack/react-query"
import { memo, useEffect, useMemo, useState } from "react"

import { IFiltersItems } from "./components/types/types"

import { List } from "./components/List"
import { SearchBlock } from "./components/SearchBlock"

import { useAuth } from "@/store"
import { getUserId } from "@/services"
import { useWebSocket } from "@/context"
import { getMillisecond, useCountMessagesNotReading, useResize } from "@/helpers"

import styles from "./styles/style.module.scss"
import { IResponseThreads } from "@/services/threads/types"

export const ListChat = memo(() => {
  const { isTablet } = useResize()
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState("")
  const { socket } = useWebSocket() ?? {}
  const userId = useAuth(({ userId }) => userId)

  const { data, refetchCountMessages } = useCountMessagesNotReading()

  const itemsProvider = data?.res || []

  const items: IResponseThreads[] = useMemo(() => {
    const ITEMS: IResponseThreads[] = itemsProvider
    if (ITEMS.length) {
      ITEMS.sort((prev, next) => {
        const prevNumber = prev.messages?.[0]?.created! ? getMillisecond(prev.messages?.[0]?.created!) : getMillisecond(prev?.created!)

        const nextNumber = next.messages?.[0]?.created! ? getMillisecond(next.messages?.[0]?.created!) : getMillisecond(next?.created!)

        return nextNumber - prevNumber
      })
    }

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
      <List search={search} items={items} setTotal={setTotal} />
    </section>
  )
})
