"use client"

import { isMobile } from "react-device-detect"
import { useQuery } from "react-query"
import { useSearchParams, useRouter } from "next/navigation"

import { ItemMyMessage } from "./components/ItemMyMessage"
import { ItemUserMessage } from "./components/ItemUserMessage"
import { TextAreaSend } from "./components/TextAreaSend"

import { useAuth, useChat } from "@/store/hooks"
import { profileService } from "@/services/profile"
import { MESSAGES_CHAT } from "./constants"

import styles from "./styles/style.module.scss"
import { cx } from "@/lib/cx"
import Image from "next/image"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

export const CurrentChat = () => {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get("user")
  const { imageProfile } = useAuth()

  const { data, isLoading } = useQuery(["profile", id], () => profileService.getProfileThroughUserId(id!))

  return (
    <section className={cx(styles.container, isMobile && styles.mobile)}>
      {
        isMobile ? (
          <div className={styles.mobileHeader}>
            <div className={cx(styles.button)} onClick={() => { push(`/messages`, undefined) }}>
              <Image
                src="/svg/chevron-left.svg"
                alt="chevron-left"
                width={24}
                height={24}
              />
            </div>
            <div className={styles.blockAvatar}>
              {
                data?.res?.image?.attributes?.url
                  ? (
                    <NextImageMotion
                      src={data?.res?.image?.attributes?.url}
                      alt="avatar"
                      width={28}
                      height={28}
                      className={styles.avatar}
                    />
                  ) : (
                    <ImageStatic
                      src="/png/default_avatar.png"
                      alt="avatar"
                      width={28}
                      height={28}
                      classNames={[styles.avatar]}
                    />
                )
              }
              <h3>{data?.res?.firstName || ""} {data?.res?.lastName || ""}</h3>
            </div>
            <div className={cx(styles.button)}>
              <Image
                src="/svg/dots-vertical.svg"
                alt="dots-vertical"
                width={24}
                height={24}
              />
            </div>
          </div>
        ) : null
      }
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
      <TextAreaSend
        photo={data?.res?.image?.attributes?.url!}
        fullName={`${data?.res?.firstName || ""} ${data?.res?.lastName || ""}`}
        userId={data?.res?.userId!}
      />
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