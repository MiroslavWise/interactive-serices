"use client"

import dynamic from "next/dynamic"
import { memo, useEffect, useState } from "react"

import type { IFiltersItems, TList } from "./types/types"

import { ThreadLoading } from "@/components/common"
import ItemListChat from "./ItemListChat"

import { useCountMessagesNotReading, useResize } from "@/helpers"

import styles from "./styles/style.module.scss"

export const List: TList = memo(({ items, search, setTotal, loadUser }) => {
  const { isTablet } = useResize()
  const [state, setState] = useState<IFiltersItems[]>([])
  const { isLoading } = useCountMessagesNotReading()

  useEffect(() => {
    if (items.length) {
      const filters =
        items?.filter((item) =>
          `${item?.people?.profile?.firstName} ${item?.people?.profile?.lastName}`?.toLowerCase()?.includes(search?.toLowerCase()),
        ) || []
      setState(filters)
    }
  }, [search, items, setTotal])

  return (
    <ul className={isTablet ? styles.containerListMobile : styles.containerList}>
      {isLoading || loadUser
        ? [1, 2, 3].map((item) => <ThreadLoading key={`::loading::${item}`} />)
        : state?.map((item, index) => (
            <ItemListChat key={`${item?.thread?.id}-${index}-item-chat`} {...item} last={index < state.length - 1} />
          ))}
    </ul>
  )
})
