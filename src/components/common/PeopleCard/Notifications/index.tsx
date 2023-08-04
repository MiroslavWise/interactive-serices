"use client"

import Image from "next/image"

import type { TPeopleCardNotifications } from "./types"

import styles from "./style.module.scss"
import { ButtonCircleGradient, ButtonFill } from "@/components/common/Buttons"

export const PeopleCard: TPeopleCardNotifications = ({
  avatar, name, date, rate, description, path,
}) => {
  return (
    <li className={styles.container}>
      <div className={styles.content}>
        <div className={styles.avatarRate}>
          <Image
            src={avatar}
            alt={avatar}
            width={56}
            height={56}
          />
          <div className={styles.badge}>
            <Image
              src="/svg/star.svg"
              alt="star"
              width={12}
              height={12}
            />
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
        <ButtonFill
          label="Перейти к истории"
          type="secondary"
        />
        <ButtonCircleGradient
          icon="/svg/bubble-chat.svg"
          type="option-1"
        />
        <ButtonCircleGradient
          icon="/svg/user-white.svg"
          type="option-1"
        />
      </div>
    </li>
  )
}