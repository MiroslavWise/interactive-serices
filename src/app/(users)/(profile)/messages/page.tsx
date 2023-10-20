"use client"

import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import { ListChat, Chat, InterviewerInfo } from "@/components/messages"

export default function Messages() {
    const searchParams = useSearchParams()
    const idThread = searchParams?.get("thread")
    const idBarter = searchParams.get("barter-id")
    const idUser = searchParams?.get("user")

    return isMobile ? (
        <div className="page-messages-page">
            {idUser || idThread || idBarter ? <Chat /> : <ListChat />}
        </div>
    ) : (
        <div className="page-mobile-messages-page">
            <ListChat />
            <Chat />
            <InterviewerInfo />
        </div>
    )
}
