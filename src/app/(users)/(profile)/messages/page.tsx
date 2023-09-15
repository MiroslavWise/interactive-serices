"use client"

import { Suspense } from "react"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import { ListChat, Chat, InterviewerInfo } from "@/components/messages"

import styles from "./style.module.scss"

export default function Messages() {
    const searchParams = useSearchParams()
    const id = searchParams.get("user")

    return (
        <Suspense fallback={false}>
            {isMobile ? (
                <div className={styles.pageMobile}>
                    {id ? <Chat /> : <ListChat />}
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
