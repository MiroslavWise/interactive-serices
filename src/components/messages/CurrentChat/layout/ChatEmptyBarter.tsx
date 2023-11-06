"use client"

import { useSearchParams } from "next/navigation"
import { useInsertionEffect, useMemo } from "react"

import type { IPostThreads } from "@/services/threads/types"
import type { IPatchDataBarter } from "@/services/barters/types"

import { usePush } from "@/helpers"
import { useAuth } from "@/store/hooks"
import { serviceBarters } from "@/services/barters"
import { serviceThreads } from "@/services/threads"
import { useToast } from "@/helpers/hooks/useToast"
import { providerIsAscending } from "@/lib/sortIdAscending"
import { useRefetchListChat } from "../../hook/useRefetchListChat"

import styles from "../styles/style.module.scss"

export const ChatEmptyBarter = () => {
    const refresh = useRefetchListChat()
    const { on } = useToast()
    const idBarter = useSearchParams()?.get("barter-id")
    const { userId } = useAuth()
    const { handleReplace } = usePush()

    const barterNumber = useMemo(() => {
        if (!idBarter || !idBarter?.includes("-")) return undefined

        return {
            id: Number(idBarter?.split("-")?.[0]),
            idUser: Number(idBarter?.split("-")[1]),
        }
    }, [idBarter])

    async function createChat() {
        async function getDataThread() {
            const { res } = await serviceThreads.get({
                user: userId,
                provider: "barter",
            })
            return res?.find(
                (item) =>
                    item?.provider?.includes("barter") &&
                    item?.barterId === Number(barterNumber?.id),
            )
        }

        async function createThread(emitterId: number, receiverId: number) {
            const provider = providerIsAscending({
                type: "barter",
                ids: [emitterId, receiverId, barterNumber?.id!],
            })!
            const data_: IPostThreads = {
                title: provider,
                emitterId: emitterId,
                receiverIds: [receiverId],
                provider: "barter",
                enabled: true,
            }

            const { res } = await serviceThreads.post(data_)
            if (res?.id) {
                const dataBarter: IPatchDataBarter = {
                    threadId: Number(res?.id),
                    updatedById: userId,
                }
                const response = await serviceBarters.patch(
                    dataBarter,
                    Number(barterNumber?.id),
                )
                console.log("response updated barter: ", response)
            }

            return res?.id
        }

        let thread = await getDataThread()
        if (thread) {
            return handleReplace(`/messages?thread=${thread?.id}`)
        }
        if (!thread) {
            const idCreate = await createThread(
                Number(userId),
                barterNumber?.idUser!,
            )

            if (!idCreate) {
                handleReplace("/messages")
                on(
                    "Извините, мы не смогли создать для вас чат. Сервер сейчас перегружен",
                )
                return
            }
            refresh("barter").finally(() => {
                handleReplace(`/messages?thread=${idCreate}`)
            })
        }
    }

    useInsertionEffect(() => {
        if (!barterNumber) {
            handleReplace("/messages")
        } else {
            if (userId) {
                createChat()
            }
        }
    }, [barterNumber, userId])

    return <section className={styles.container} />
}
