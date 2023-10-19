"use client"

import { useSearchParams } from "next/navigation"

import { ChatNull } from "./layout/ChatNull"
import { ChatEmpty } from "./layout/ChatEmpty"
import { ChatEmptyBarter } from "./layout/ChatEmptyBarter"
import { CurrentChat } from "./layout/CurrentChat"

export const Chat = () => {
    const searchParams = useSearchParams()
    const idUser = searchParams.get("user")
    const idBarter = searchParams.get("barter-id")
    const isThread = searchParams.get("thread")

    if (idBarter) return <ChatEmptyBarter />
    if (idUser) return <ChatEmpty />
    if (isThread) return <CurrentChat />

    return <ChatNull />
}
