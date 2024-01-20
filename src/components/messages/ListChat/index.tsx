"use client"

import dayjs from "dayjs"
import { isMobile } from "react-device-detect"
import { useQueries } from "@tanstack/react-query"
import { memo, useEffect, useMemo, useState } from "react"

import { IFiltersItems } from "./components/types/types"

import { List } from "./components/List"
import { SearchBlock } from "./components/SearchBlock"
import { Segments } from "@/components/common/Segments"

import { useWebSocket } from "@/context"
import { serviceUser } from "@/services/users"
import { SEGMENTS_CHAT } from "./constants/segments"
import { useCountMessagesNotReading } from "@/helpers"
import { dispatchMessagesType, useAuth, useMessagesType } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const ListChat = memo(function ListChat() {
    const [total, setTotal] = useState(0)
    const [search, setSearch] = useState("")
    const { socket } = useWebSocket() ?? {}
    const userId = useAuth(({ userId }) => userId)
    const type = useMessagesType(({ type }) => type)

    const { data, refetchCountMessages } = useCountMessagesNotReading()

    const usersIds = useMemo(() => {
        if (!!data?.res && !!userId) {
            const idsArray =
                data?.res?.map((item) => {
                    return Number(item?.emitterId) === Number(userId) ? Number(item?.receiverIds[0]) : Number(item?.emitterId)
                }) || []
            const ids = new Set(idsArray)
            const array: number[] = []
            ids.forEach((item) => {
                if (item) {
                    array.push(item)
                }
            })
            return array
        }
        return []
    }, [data?.res, userId])

    const arrayUsers = useQueries({
        queries: usersIds.map((item) => ({
            queryFn: () => serviceUser.getId(Number(item)),
            queryKey: ["user", { userId: item }],
            enabled: !!usersIds.length,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        })),
    })

    const itemsProvider = useMemo(() => {
        return data?.res?.filter((item) => item.provider === type) || []
    }, [data?.res, type])

    const items: IFiltersItems[] = useMemo(() => {
        const ITEMS: IFiltersItems[] = []
        if (itemsProvider?.length && arrayUsers?.every((item) => !item.isLoading)) {
            itemsProvider?.forEach((item) => {
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
                const prevNumber = prev.thread.messages?.[0]?.created!
                    ? dayjs(prev.thread.messages?.[0]?.created!).valueOf()
                    : dayjs(prev.thread?.created!).valueOf()

                const nextNumber = next.thread.messages?.[0]?.created!
                    ? dayjs(next.thread.messages?.[0]?.created!).valueOf()
                    : dayjs(next.thread?.created!).valueOf()

                return nextNumber - prevNumber
            })
        }

        return ITEMS
    }, [arrayUsers, itemsProvider, userId])

    useEffect(() => {
        function chatResponse(event: any) {
            refetchCountMessages()
        }

        if (userId && socket) {
            socket?.on(`chatResponse-${userId}`, chatResponse)
        }

        return () => {
            socket?.off(`chatResponse-${userId}`, chatResponse)
        }
    }, [socket, userId])

    return (
        <section className={isMobile ? styles.containerMobile : styles.container}>
            {!isMobile && typeof isMobile !== "undefined" ? (
                <header>
                    <div data-total-number>
                        <h4>Сообщения</h4>
                    </div>
                    <Segments
                        type="primary"
                        active={SEGMENTS_CHAT.find((item) => item.value === type)!}
                        VALUES={SEGMENTS_CHAT}
                        setActive={(values) => {
                            dispatchMessagesType(values.value)
                        }}
                        classNames={styles.segments}
                        isBorder
                    />
                </header>
            ) : null}
            <SearchBlock {...{ search, setSearch }} />
            <List search={search} items={items} setTotal={setTotal} />
        </section>
    )
})
