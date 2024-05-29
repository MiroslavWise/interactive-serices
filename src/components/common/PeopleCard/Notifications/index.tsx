"use client"

import Image from "next/image"

import type { TPeopleCardNotifications } from "./types"

import { Button, ImageStatic, NextImageMotion, ButtonCircleGradient } from "@/components/common"

import { useAuth_ } from "@/store"
import { usePush } from "@/helpers/hooks/usePush"

import styles from "./style.module.scss"

export const PeopleCard: TPeopleCardNotifications = ({ avatar, name, date, rate, description, path, userId }) => {
  const { id: myId } = useAuth_(({ auth }) => auth) ?? {}
  const { handlePush } = usePush()

  return (
    <li className={styles.container}>
      <div className={styles.content} onClick={() => handlePush(path!)}>
        <div className={styles.avatarRate}>
          {avatar ? (
            <NextImageMotion className={styles.image} src={avatar} alt={"avatar"} width={56} height={56} />
          ) : (
            <ImageStatic className={styles.image} src="/png/default_avatar.png" alt={"avatar"} width={56} height={56} />
          )}
          <div className={styles.badge}>
            <Image src="/svg/star.svg" alt="star" width={12} height={12} unoptimized />
            <p>{rate}</p>
          </div>
        </div>
        <div className={styles.wrapperInfo}>
          <h3>{name}</h3>
          <p>{date}</p>
          <p>{description}</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button type="button" typeButton="fill-orange" label="Перейти к истории" className={styles.buttonFill} />
        <ButtonCircleGradient
          icon="/svg/chat-dots-optional-1.svg"
          type="option-1"
          size={20}
          handleClick={() => {
            if (myId) {
              handlePush(`/messages?user=${userId}`)
            }
          }}
        />
      </div>
    </li>
  )
}
