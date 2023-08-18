"use client"

import { useQuery } from "react-query"
import { useSearchParams, useRouter } from "next/navigation"

import { useChat } from "@/store/hooks"
import { profileService } from "@/services/profile"

import styles from "./styles/style.module.scss"

export const CurrentChat = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get("user")

  const { data, isLoading } = useQuery(["profile", id], () => profileService.getProfileThroughUserId(id!))

  return (
    <section className={styles.container}>
    </section>
  )
}

export const ChatEmpty = () => <section className={styles.container} />

export const Chat = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get("user")
  const { currentChatId } = useChat()

  return (currentChatId || id) ? <CurrentChat /> : <ChatEmpty />
}