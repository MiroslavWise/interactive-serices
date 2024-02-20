"use client"

import dayjs from "dayjs"
import { isMobile } from "react-device-detect"
import { useQueries } from "@tanstack/react-query"
import { memo, useEffect, useMemo, useState } from "react"

import { IFiltersItems } from "./components/types/types"

import { List } from "./components/List"
import { SearchBlock } from "./components/SearchBlock"

import { useAuth } from "@/store"
import { getUserId } from "@/services"
import { useWebSocket } from "@/context"
import { useCountMessagesNotReading } from "@/helpers"

import styles from "./styles/style.module.scss"

export const ListChat = memo(function ListChat() {
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState("")
  const { socket } = useWebSocket() ?? {}
  const userId = useAuth(({ userId }) => userId)

  const { data, refetchCountMessages } = useCountMessagesNotReading()

  const usersIds = useMemo(() => {
    if (!!data?.res && !!userId) {
      const idsArray =
        data?.res?.map((item) => {
          return Number(item?.emitterId) === Number(userId) ? Number(item?.receiverIds[0]) : Number(item?.emitterId)
        }) || []
      const ids = new Set(idsArray)
      const array: number[] = []
      ids.forEach((item) => {
        if (item) {
          array.push(item)
        }
      })
      return array
    }
    return []
  }, [data?.res, userId])

  const arrayUsers = useQueries({
    queries: usersIds.map((item) => ({
      queryFn: () => getUserId(item),
      queryKey: ["user", { userId: item }],
      enabled: !!item,
    })),
  })

  const loadUser = useMemo(() => {
    return arrayUsers?.some((item) => item.isLoading)
  }, [arrayUsers])

  const itemsProvider = data?.res || []

  const items: IFiltersItems[] = useMemo(() => {
    const ITEMS: IFiltersItems[] = []
    if (itemsProvider?.length && arrayUsers?.every((item) => !item.isLoading)) {
      itemsProvider?.forEach((item) => {
        const idUser = Number(item?.emitterId) === Number(userId) ? Number(item?.receiverIds[0]) : Number(item?.emitterId)
        const people = arrayUsers.find((item) => Number(item?.data?.res?.id) === Number(idUser) && item?.data?.res?.profile)
        if (people) {
          ITEMS.push({
            thread: item!,
            people: people?.data?.res!,
          })
        }
      })
      ITEMS.sort((prev, next) => {
        const prevNumber = prev.thread.messages?.[0]?.created!
          ? dayjs(prev.thread.messages?.[0]?.created!).valueOf()
          : dayjs(prev.thread?.created!).valueOf()

        const nextNumber = next.thread.messages?.[0]?.created!
          ? dayjs(next.thread.messages?.[0]?.created!).valueOf()
          : dayjs(next.thread?.created!).valueOf()

        return nextNumber - prevNumber
      })
    }

    return ITEMS
  }, [arrayUsers, itemsProvider, userId])

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
    <section className={isMobile ? styles.containerMobile : styles.container}>
      {!isMobile && typeof isMobile !== "undefined" ? (
        <header>
          <div data-total-number>
            <h4>Сообщения</h4>
          </div>
        </header>
      ) : null}
      <SearchBlock {...{ search, setSearch }} />
      <List search={search} items={items} setTotal={setTotal} loadUser={loadUser} />
    </section>
  )
})
