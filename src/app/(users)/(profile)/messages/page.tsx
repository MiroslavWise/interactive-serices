"use client"

import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import { ListChat, Chat, InterviewerInfo } from "@/components/messages"

import styles from "./style.module.scss"

export default function Messages() {
    const searchParams = useSearchParams()
    const idUser = searchParams?.get("user")

    return isMobile ? (
        <div className={styles.pageMobile}>
            {idUser ? <Chat /> : <ListChat />}
        </div>
    ) : (
        <div className={styles.page}>
            <ListChat />
            <Chat />
            <InterviewerInfo />
        </div>
    )
}
