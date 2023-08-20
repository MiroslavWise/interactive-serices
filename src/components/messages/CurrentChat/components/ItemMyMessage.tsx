"use client"

import { isMobile } from "react-device-detect"

import type { TItemMessage } from "./types/types"

import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import styles from "./styles/item-message.module.scss"
import { cx } from "@/lib/cx"

export const ItemMyMessage: TItemMessage = ({ photo, message, time }) => {

  return (
    <li className={cx(styles.containerItemMyMessage, isMobile && styles.mobile)}>
      <div className={styles.blockMessage}>
        <p>{message}</p>
        <p className={styles.time}>{time} AM</p>
      </div>
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
    </li>
  )
}