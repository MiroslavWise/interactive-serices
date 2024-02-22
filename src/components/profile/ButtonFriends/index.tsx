"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { serviceFriends } from "@/services"
import { useAuth, useDroverFriends } from "@/store"
import { DeclensionQuantityFriends } from "@/lib/declension"

import styles from "./style.module.scss"

export const ButtonFriends = () => {
  const dispatchFriends = useDroverFriends(({ dispatchFriends }) => dispatchFriends)
  const userId = useAuth(({ userId }) => userId)

  const { data } = useQuery({
    queryFn: () => serviceFriends.get(),
    queryKey: ["friends", `user=${userId}`, `filter=list`],
    enabled: !!userId,
  })

  function handleOpen() {
    dispatchFriends({ visible: true })
  }

  const friends = useMemo(() => {
    return data?.res?.length || 0
  }, [data?.res])

  return (
    <button className={styles.button} onClick={handleOpen}>
      <span>{DeclensionQuantityFriends(friends)}</span>
      <img src="/svg/arrow-right.svg" alt="right" width={20} height={20} />
    </button>
  )
}
