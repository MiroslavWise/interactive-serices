"use client"

import { useQuery } from "react-query"
import { useSearchParams, useRouter } from "next/navigation"

import { ItemMyMessage } from "./components/ItemMyMessage"
import { ItemUserMessage } from "./components/ItemUserMessage"
import { TextAreaSend } from "./components/TextAreaSend"

import { useAuth, useChat } from "@/store/hooks"
import { profileService } from "@/services/profile"
import { MESSAGES_CHAT } from "./constants"

import styles from "./styles/style.module.scss"

export const CurrentChat = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get("user")
  const { imageProfile } = useAuth()

  const { data, isLoading } = useQuery(["profile", id], () => profileService.getProfileThroughUserId(id!))

  return (
    <section className={styles.container}>
      <ul>
        {
          MESSAGES_CHAT({ user: data?.res?.image?.attributes?.url!, my_photo: imageProfile?.attributes?.url! })
            ?.map((item, index) => (
              item.isMe ? (
                <ItemMyMessage key={`${index}_message_${item.avatar_url}`} photo={item.avatar_url} message={item.message} time={item.time} />
              ) : (
                <ItemUserMessage key={`${index}_message`} photo={item.avatar_url} message={item.message} time={item.time} />
              )
            ))
        }
      </ul>
      <TextAreaSend />
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