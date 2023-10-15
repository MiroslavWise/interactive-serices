"use client"

import { toast } from "react-toastify"
import { useTheme } from "next-themes"
import { useSearchParams } from "next/navigation"
import { useInsertionEffect, useMemo } from "react"

import type { IPostThreads } from "@/services/threads/types"

import { usePush } from "@/helpers"
import { useAuth } from "@/store/hooks"
import { serviceThreads } from "@/services/threads"
import { serviceBarters } from "@/services/barters"
import { providerIsAscending } from "@/lib/sortIdAscending"
import { IPatchDataBarter } from "@/services/barters/bartersService"

import styles from "../styles/style.module.scss"

export const ChatEmptyBarter = () => {
    const { systemTheme } = useTheme()
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
                    (item?.provider?.includes("barter") &&
                        Number(item?.provider?.split(":")?.[1]) ===
                            Number(barterNumber?.id)) ||
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
                barterId: barterNumber?.id!,
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
                    Number(idBarter),
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
                toast(
                    `Извините, мы не смогли создать для вас чат. Сервер сейчас перегружен`,
                    {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: systemTheme!,
                    },
                )
                return
            }

            handleReplace(`/messages?thread=${idCreate}`)
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
