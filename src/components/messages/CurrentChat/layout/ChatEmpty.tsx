"use client"

import { useInsertionEffect } from "react"
import { useSearchParams } from "next/navigation"

import { useCountMessagesNotReading, usePush } from "@/helpers"
import { useAuth } from "@/store/hooks"
import { serviceThreads } from "@/services/threads"
import { useToast } from "@/helpers/hooks/useToast"
import { IPostThreads } from "@/services/threads/types"
import { providerIsAscending } from "@/lib/sortIdAscending"

import styles from "../styles/style.module.scss"

export const ChatEmpty = () => {
    const { on } = useToast()
    const idUser = useSearchParams().get("user")
    const userId = useAuth(({ userId }) => userId)
    const { handleReplace } = usePush()
    const { refetchCountMessages } = useCountMessagesNotReading()

    async function createChat() {
        async function getDataThread(emitterId: number, receiverId: number) {
            const { res } = await serviceThreads.get({
                user: emitterId,
                provider: "personal",
            })
            return res?.find(
                (item) =>
                    ((item?.receiverIds?.find((id) => id === receiverId) && item?.emitterId === emitterId) ||
                        (item?.receiverIds?.find((id) => id === emitterId) && item?.emitterId === receiverId)) &&
                    item?.provider?.includes("personal"),
            )
        }

        async function createThread(emitterId: number, receiverId: number) {
            const provider = providerIsAscending({
                type: "personal",
                ids: [emitterId, receiverId],
            })!
            const data_: IPostThreads = {
                title: provider,
                receiverIds: [receiverId],
                provider: "personal",
                enabled: true,
            }
            const { res } = await serviceThreads.post(data_)

            return res?.id
        }

        if (!idUser) {
            return handleReplace("/messages")
        }
        const idUserReceiver: number = Number(idUser)
        let thread = await getDataThread(idUserReceiver, userId!)
        if (thread) {
            return handleReplace(`/messages?thread=${thread?.id}`)
        }
        if (!thread) {
            const idCreate = await createThread(Number(userId), idUserReceiver)

            if (!idCreate) {
                handleReplace("/messages")
                on(
                    {
                        message: "Извините, мы не смогли создать для вас чат. Сервер сейчас перегружен",
                    },
                    "warning",
                )
                return
            }
            refetchCountMessages().finally(() => {
                handleReplace(`/messages?thread=${idCreate}`)
            })
        }
    }

    useInsertionEffect(() => {
        if (!idUser) {
            handleReplace("/messages")
        } else {
            if (userId) {
                createChat()
            }
        }
    }, [idUser, userId])

    return <section className={styles.wrapper} />
}
