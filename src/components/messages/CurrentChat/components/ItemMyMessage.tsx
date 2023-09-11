"use client"

import { isMobile } from "react-device-detect"

import type { TItemMessage } from "./types/types"

import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { stylesBlockRight } from "@/lib/styles-block-message"

import styles from "./styles/item-message.module.scss"

export const ItemMyMessage: TItemMessage = ({ photo, messages, time }) => {
    return (
        <li
            className={cx(
                styles.containerItemMyMessage,
                isMobile && styles.mobile,
            )}
        >
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
                        <p className={styles.time}>{time} AM</p>
                    </div>
                ))}
            </div>
            {!isMobile ? (
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
            ) : null}
        </li>
    )
}
