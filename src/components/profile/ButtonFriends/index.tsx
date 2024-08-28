"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { getFriends } from "@/services"
import { dispatchMyFriends, useAuth } from "@/store"
import { DeclensionQuantityFriends } from "@/lib/declension"

import styles from "./style.module.scss"

export const ButtonFriends = () => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const { data } = useQuery({
    queryFn: () => getFriends({}),
    queryKey: ["friends", { userId: userId, filter: "list" }],
    enabled: !!userId,
  })

  const friends = useMemo(() => {
    return data?.data?.length || 0
  }, [data?.data])

  return (
    <button className={styles.button} onClick={dispatchMyFriends} data-test="aside-profile-button-friends">
      <span>{DeclensionQuantityFriends(friends)}</span>
      <img src="/svg/arrow-right.svg" alt="right" width={20} height={20} />
    </button>
  )
}
