"use client"

import { useEffect, useState } from "react"

import type { TList } from "./types/types"
import { IResponseThreads } from "@/services/threads/types"

import { ItemListChat } from "./ItemListChat"
import { ThreadLoading } from "@/components/common"

import { useAuth_ } from "@/store"
import { useCountMessagesNotReading, useResize } from "@/helpers"

import styles from "./styles/style.module.scss"

export const List: TList = ({ items = [], search = "" }) => {
  const { id: userId } = useAuth_(({ auth }) => auth) ?? {}
  const { isTablet } = useResize()
  const [state, setState] = useState<IResponseThreads[]>(items)
  const { isLoading } = useCountMessagesNotReading()

  useEffect(() => {
    const searchTrim = search?.trim()?.toLowerCase()
    if (items.length) {
      if (!searchTrim) {
        setState(items)
        return
      }

      const filters =
        items?.filter((item) => {
          if (!searchTrim) return true
          const interlocutor = item.emitter.id === userId ? item.receivers[0] : item.emitter

          return `${interlocutor?.firstName} ${interlocutor?.lastName}`?.toLowerCase()?.includes(searchTrim)
        }) || []
      setState(filters)
    }
  }, [search, items, userId])

  return (
    <ul className={isTablet ? styles.containerListMobile : styles.containerList}>
      {isLoading
        ? [1, 2, 3].map((item) => <ThreadLoading key={`::loading::${item}`} />)
        : state?.map((item, index) => (
            <ItemListChat key={`${item?.id}-${index}-item-chat`} thread={item} last={index < items.length - 1} />
          ))}
    </ul>
  )
}
