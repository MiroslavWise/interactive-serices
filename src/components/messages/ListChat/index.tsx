"use client"

import dayjs from "dayjs"
import { useTheme } from "next-themes"
import { isMobile } from "react-device-detect"
import { memo, useEffect, useMemo, useState } from "react"
import { useQueries, useQuery } from "@tanstack/react-query"

import { IFiltersItems } from "./components/types/types"

import { List } from "./components/List"
import { SearchBlock } from "./components/SearchBlock"
import { Segments } from "@/components/common/Segments"

import { useWebSocket } from "@/context"
import { serviceUsers } from "@/services/users"
import { serviceThreads } from "@/services/threads"
import { SEGMENTS_CHAT } from "./constants/segments"
import { dispatchMessagesType, useAuth, useMessagesType } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const ListChat = memo(function ListChat() {
    const [total, setTotal] = useState(0)
    const { systemTheme } = useTheme()
    const [search, setSearch] = useState("")
    const { socket } = useWebSocket() ?? {}
    const userId = useAuth(({ userId }) => userId)
    const type = useMessagesType(({ type }) => type)

    const { data, refetch } = useQuery({
        queryFn: () =>
            serviceThreads.get({
                user: userId!,
                provider: type,
                order: "DESC",
                messagesLimit: 1,
                messagesOrder: "DESC",
            }),
        queryKey: ["threads", `user=${userId}`, `provider=${type}`],
        refetchOnMount: true,
    })

    const usersIds = useMemo(() => {
        if (!!data?.res && !!userId) {
            const idsArray =
                data?.res?.map((item) => {
                    return Number(item?.emitterId) === Number(userId) ? Number(item?.receiverIds[0]) : Number(item?.emitterId)
                }) || []
            const ids = new Set(idsArray)
            const array: number[] = []
            ids.forEach((item) => {
                array.push(item)
            })
            return array
        }
        return []
    }, [data?.res, userId])

    const arrayUsers = useQueries({
        queries: usersIds.map((item) => ({
            queryFn: () => serviceUsers.getId(Number(item)),
            queryKey: ["user", item],
            enabled: !!usersIds.length,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        })),
    })

    const items: IFiltersItems[] = useMemo(() => {
        const ITEMS: IFiltersItems[] = []
        if (data && arrayUsers?.every((item) => !item.isLoading)) {
            data?.res?.forEach((item) => {
                const idUser = Number(item?.emitterId) === Number(userId) ? Number(item?.receiverIds[0]) : Number(item?.emitterId)
                const people = arrayUsers.find((item) => Number(item?.data?.res?.id) === Number(idUser) && item?.data?.res?.profile)
                if (people) {
                    ITEMS.push({
                        thread: item!,
                        people: people?.data?.res!,
                    })
                }
            })
            ITEMS.sort((prev, next) => {
                const prevNumber = prev.thread.messages?.[0]?.created! ? dayjs(prev.thread.messages?.[0]?.created!).valueOf() : 0

                const nextNumber = next.thread.messages?.[0]?.created! ? dayjs(next.thread.messages?.[0]?.created!).valueOf() : 0

                return nextNumber - prevNumber
            })
        }

        return ITEMS
    }, [arrayUsers, data, userId])

    useEffect(() => {
        function chatResponse(event: any) {
            refetch()
        }

        if (userId && socket) {
            socket?.on(`chatResponse-${userId}`, chatResponse)
        }

        return () => {
            socket?.off(`chatResponse-${userId}`, chatResponse)
        }
    }, [socket, userId])

    return isMobile ? (
        <section className={styles.containerMobile}>
            <SearchBlock {...{ search, setSearch }} />
            <List search={search} setTotal={setTotal} items={items} />
        </section>
    ) : (
        <section className={styles.container}>
            <header>
                <div data-total-number>
                    <h4>Сообщения</h4>
                </div>
                <Segments
                    type={systemTheme === "dark" ? "primary" : "optional-1"}
                    active={SEGMENTS_CHAT.find((item) => item.value === type)!}
                    VALUES={SEGMENTS_CHAT}
                    setActive={(values) => {
                        dispatchMessagesType(values.value)
                    }}
                    classNames={styles.segments}
                    isBorder
                />
            </header>
            <SearchBlock {...{ search, setSearch }} />
            <List search={search} items={items} setTotal={setTotal} />
        </section>
    )
})
