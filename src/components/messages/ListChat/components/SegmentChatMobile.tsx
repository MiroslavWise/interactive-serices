"use client"

import Image from "next/image"

import type { TSegmentChatMobile } from "./types/types"
import type { TTypeProviderThreads } from "@/services/threads/types"

import { SEGMENTS_CHAT } from "../constants/segments"
import { useMessagesType } from "@/store/state/useMessagesType"

import styles from "./styles/segment-chat-mobile.module.scss"

export const SegmentChatMobile: TSegmentChatMobile = ({}) => {
    const { type, dispatchMessagesType } = useMessagesType()

    function handle(value: TTypeProviderThreads) {
        const segment = SEGMENTS_CHAT.find((item) => item.value === value)!
        dispatchMessagesType({ type: segment.value })
    }

    return (
        <div className={styles.container}>
            <button
                data-active={type === "personal"}
                onClick={() => {
                    handle("personal")
                }}
            >
                <Image
                    src="/svg/users-03.svg"
                    alt="repeat-white"
                    width={18}
                    height={18}
                />
            </button>
            <button
                data-active={type === "barter"}
                onClick={() => {
                    handle("barter")
                }}
            >
                <Image
                    src="/svg/repeat-white.svg"
                    alt="repeat-white"
                    width={18}
                    height={18}
                />
            </button>
        </div>
    )
}
