import dayjs from "dayjs"

import type { TItemMessage } from "./types/types"

import styles from "./styles/item-message.module.scss"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

export const ItemUserMessage: TItemMessage = ({ photo, message, time }) => {

  return (
    <li className={styles.containerItemUserMessage}>
      {
        photo ? (
          <NextImageMotion
            src={photo}
            alt="avatar"
            width={250}
            height={250}
            className={styles.avatar}
          />
        ) : (
          <ImageStatic
            src="/png/default_avatar.png"
            alt="avatar"
            width={250}
            height={250}
            classNames={[styles.avatar]}
          />
        )
      }
      <div className={styles.blockMessage}>
        <p>{message}</p>
        <p className={styles.time}>{time} AM</p>
      </div>
    </li>
  )
}