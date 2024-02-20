"use client"

import { EnumProviderThreads } from "@/types/enum"
import type { TSegmentChatMobile } from "./types/types"

import { SEGMENTS_CHAT } from "../constants/segments"
import { dispatchMessagesType, useMessagesType } from "@/store/state/useMessagesType"

import styles from "./styles/segment-chat-mobile.module.scss"

export const SegmentChatMobile: TSegmentChatMobile = ({}) => {
  const type = useMessagesType(({ type }) => type)

  function handle(value: EnumProviderThreads) {
    const segment = SEGMENTS_CHAT.find((item) => item.value === value)!
    dispatchMessagesType(segment.value)
  }

  return (
    <div className={styles.container}>
      {SEGMENTS_CHAT.map((item) => (
        <button
          key={`::${item.value}::button::`}
          data-active={type === item.value}
          onClick={(event) => {
            event.stopPropagation()
            handle(item.value)
          }}
        >
          <img src={item.img} alt="icon" width={18} height={18} />
        </button>
      ))}
    </div>
  )
}
