"use client"

import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import { ListChat, Chat, InterviewerInfo } from "@/components/messages"

import "./page.scss"

export default function Messages() {
    const searchParams = useSearchParams()
    const idThread = searchParams?.get("thread")
    const idBarter = searchParams.get("barter-id")
    const idUser = searchParams?.get("user")

    return (
        <div className="__page-messages__">
            {isMobile ? (
                idUser || idThread || idBarter ? (
                    <Chat />
                ) : (
                    <ListChat />
                )
            ) : (
                <>
                    <ListChat />
                    <Chat />
                    <InterviewerInfo />
                </>
            )}
        </div>
    )
}
