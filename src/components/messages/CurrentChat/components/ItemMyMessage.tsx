"use client"

import { memo } from "react"
import { isMobile } from "react-device-detect"

import type { TItemMessage } from "./types/types"

import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { stylesBlockRight } from "@/lib/styles-block-message"
import { timeNowOrBeforeChat } from "@/lib/timeNowOrBefore"

import styles from "./styles/item-message.module.scss"

export const ItemMyMessage: TItemMessage = memo(function $ItemMyMessage({ photo, messages }) {
    return (
        <li className={styles.containerItemMyMessage}>
            <div className={styles.messages}>
                {messages?.map((item, index) => (
                    <div
                        className={cx(styles.blockMessage, styles[stylesBlockRight(messages?.length!, index)])}
                        data-temporary={!!item?.temporary}
                        key={`${item.id}_${item.message}`}
                        id={`${item.id!}`}
                    >
                        <p>{item.message}</p>
                        <p className={styles.time}>{timeNowOrBeforeChat(item?.time)}</p>
                    </div>
                ))}
            </div>
            {!isMobile ? (
                photo ? (
                    <NextImageMotion src={photo} alt="avatar" width={32} height={32} className={styles.avatar} />
                ) : (
                    <ImageStatic src="/png/default_avatar.png" alt="avatar" width={32} height={32} className={styles.avatar} />
                )
            ) : null}
        </li>
    )
})
