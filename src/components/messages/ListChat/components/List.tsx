"use client"

import { isMobile } from "react-device-detect"
import { memo, useEffect, useState } from "react"

import type { IFiltersItems, TList } from "./types/types"

import { ItemListChat } from "./ItemListChat"
import { ThreadLoading } from "@/components/common"

import { useCountMessagesNotReading } from "@/helpers"

import styles from "./styles/style.module.scss"

export const List: TList = memo(function List({ items, search, setTotal, loadUser }) {
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
    <ul className={isMobile ? styles.containerListMobile : styles.containerList}>
      {isLoading || loadUser
        ? [1, 2, 3].map((item) => <ThreadLoading key={`::loading::${item}`} />)
        : state?.map((item, index) => (
            <ItemListChat key={`${item?.thread?.id}-${index}-item-chat`} {...item} last={index < state.length - 1} />
          ))}
    </ul>
  )
})
