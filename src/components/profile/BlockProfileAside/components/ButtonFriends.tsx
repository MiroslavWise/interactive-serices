"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { useAuth } from "@/store/hooks"
import { serviceFriends } from "@/services/friends"
import { DeclensionQuantityFriends } from "@/lib/declension"
import { useDroverFriends } from "@/store/state/useDroverFriends"

import styles from "../styles/button-friends.module.scss"

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
    <div className={styles.container} onClick={handleOpen}>
      <p>{DeclensionQuantityFriends(friends)}</p>
      <img src="/svg/arrow-right.svg" alt="arrow-right" width={24} height={24} />
    </div>
  )
}
