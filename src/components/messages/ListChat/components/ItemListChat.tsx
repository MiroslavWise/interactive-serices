"use client"

import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"

import type { TItemListChat } from "./types/types"

import { NextImageMotion } from "@/components/common/Image"
import { GeoTagging } from "@/components/common/GeoTagging"

import { useChat } from "@/store/hooks"
import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

const text = "Hey Olivia, Katherine sent me over the latest doc. I just have a quick question about the. Hey Olivia, Katherine sent me over the latest doc. I just have a quick question about the..."

export const ItemListChat: TItemListChat = ({ item }) => {
  const { push } = useRouter()
  const { get } = useSearchParams()
  const { setCurrentChat, currentChatId } = useChat()
  const id = get("user")

  function handleCurrentChat() {
    push(`/messages?user=${item.userId}`)
    setCurrentChat(item.userId)
  }

  return (
    <li
      className={cx(styles.containerItemListChat, item.userId.toString() === (id?.toString() || currentChatId?.toString()) && styles.active)}
      onClick={handleCurrentChat}
    >
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <div className={styles.avatar}>
            <NextImageMotion
              src={item.image.attributes.url}
              alt="avatar"
              width={400}
              height={400}
              className={styles.img}
            />
            <Image
              src="/svg/verified-tick.svg"
              alt="verified"
              width={16}
              height={16}
              className={styles.verified}
            />
          </div>
          <div className={styles.nameAndGeo}>
            <h4>{item.firstName} {item.lastName}</h4>
            <GeoTagging
              location="Москва, Пролетарская"
              size={14}
              fontSize={12}
            />
          </div>
        </div>
        <p className={styles.timeAgo}>5 мин</p>
      </div>
      <div className={styles.blockLastMessage}><p>{item.about ? item.about : text}</p></div>
    </li>
  )
}