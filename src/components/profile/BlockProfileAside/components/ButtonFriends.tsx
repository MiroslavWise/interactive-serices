"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { getFriends } from "@/services/friends"
import { DeclensionQuantityFriends } from "@/lib/declension"
import { useDroverFriends, useAuth } from "@/store"

import styles from "../styles/button-friends.module.scss"

export const ButtonFriends = () => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const dispatchFriends = useDroverFriends(({ dispatchFriends }) => dispatchFriends)

  const { data } = useQuery({
    queryFn: () => getFriends({}),
    queryKey: ["friends", { userId: userId, filter: "list" }],
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
