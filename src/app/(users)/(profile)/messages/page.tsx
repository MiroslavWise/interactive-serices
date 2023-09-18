"use client"

import { Suspense } from "react"
import { isMobile } from "react-device-detect"

import type { IPropsPageMessages } from "./types"

import { ListChat, Chat, InterviewerInfo } from "@/components/messages"

import styles from "./style.module.scss"

export default function Messages({
    params,
    searchParams: { user, thread },
}: IPropsPageMessages) {
    return (
        <Suspense fallback={false}>
            {isMobile ? (
                <div className={styles.pageMobile}>
                    {user ? <Chat /> : <ListChat />}
                </div>
            ) : (
                <div className={styles.page}>
                    <ListChat />
                    <Chat />
                    <InterviewerInfo />
                </div>
            )}
        </Suspense>
    )
}
