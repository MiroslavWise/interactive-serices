"use client"

import { Suspense } from "react"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import { ListChat } from "@/components/messages/ListChat"
import { Chat } from "@/components/messages/CurrentChat"
import { InterviewerInfo } from "@/components/messages/InterviewerInfo"

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
