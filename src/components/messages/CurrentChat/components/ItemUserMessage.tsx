"use client"

import { memo } from "react"
import { isMobile } from "react-device-detect"

import type { TItemMessage } from "./types/types"

import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { stylesBlockRight } from "@/lib/styles-block-message"
import { matchesUserName, regExUserName } from "@/helpers"
import { timeNowOrBeforeChat } from "@/lib/timeNowOrBefore"

import styles from "./styles/item-message.module.scss"

export const ItemUserMessage: TItemMessage = memo(function $ItemUserMessage({
    photo,
    messages,
}) {
    return (
        <li className={styles.containerItemUserMessage}>
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
                        <p>
                            {matchesUserName(item.message!)
                                ? item.message.split(" ").map((match, index) =>
                                      regExUserName.test(match) ? (
                                          <span
                                              key={index + match + item.id}
                                              data-username
                                          >
                                              {" "}
                                              {match}
                                          </span>
                                      ) : (
                                          ` ${match}`
                                      ),
                                  )
                                : item.message}
                        </p>
                        <p className={styles.time}>
                            {timeNowOrBeforeChat(item?.time!)}
                        </p>
                    </div>
                ))}
            </div>
        </li>
    )
})
