"use client"

import { isMobile } from "react-device-detect"

import type { TItemMessage } from "./types/types"

import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { stylesBlockRight } from "@/lib/styles-block-message"
import { timeNowOrBeforeChat } from "@/lib/timeNowOrBefore"

import styles from "./styles/item-message.module.scss"

export const ItemUserMessage: TItemMessage = ({ photo, messages }) => {
    return (
        <li
            className={cx(
                styles.containerItemUserMessage,
                isMobile && styles.mobile,
            )}
        >
            {!isMobile ? (
                photo ? (
                    <NextImageMotion
                        src={photo}
                        alt="avatar"
                        width={32}
                        height={32}
                        className={styles.avatar}
                    />
                ) : (
                    <ImageStatic
                        src="/png/default_avatar.png"
                        alt="avatar"
                        width={32}
                        height={32}
                        classNames={[styles.avatar]}
                    />
                )
            ) : null}
            <div className={styles.messages}>
                {messages?.map((item, index) => (
                    <div
                        className={cx(
                            styles.blockMessage,
                            styles[stylesBlockRight(messages?.length!, index)],
                        )}
                        key={`${item.id}_${item.message}`}
                        id={`${item.id!}`}
                    >
                        <p>{item.message}</p>
                        <p className={styles.time}>{timeNowOrBeforeChat(item?.time!)}</p>
                    </div>
                ))}
            </div>
        </li>
    )
}
