"use client"

import { useTheme } from "next-themes"
import { useEffect, useMemo, useState } from "react"
import { isMobile } from "react-device-detect"
import { useQueries, useQuery } from "react-query"

import { IFiltersItems } from "./components/types/types"
import type { TTypeProviderThreads } from "@/services/threads/types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { List } from "./components/List"
import { SearchBlock } from "./components/SearchBlock"
import { Segments } from "@/components/common/Segments"

import { useAuth } from "@/store/hooks"
import { serviceUsers } from "@/services/users"
import { serviceThreads } from "@/services/threads"
import { SEGMENTS_CHAT } from "./constants/segments"

import styles from "./styles/style.module.scss"
import { useWebSocket } from "@/context"

export const ListChat = () => {
    const { userId } = useAuth()
    const { systemTheme } = useTheme()
    const [search, setSearch] = useState("")
    const { socket } = useWebSocket() ?? {}
    const [value, setValue] = useState<ISegmentValues<TTypeProviderThreads>>(
        SEGMENTS_CHAT[0],
    )
    const [total, setTotal] = useState(0)

    const { data, refetch } = useQuery({
        queryFn: () =>
            serviceThreads.get({
                user: userId!,
                provider: value.value,
                order: "DESC",
            }),
        queryKey: ["threads", `user=${userId}`, `provider=${value.value}`],
        refetchOnMount: false,
    })

    const arrayUsers = useQueries(
        data?.res?.map((item) => {
            const idUser =
                Number(item?.emitterId) === Number(userId)
                    ? Number(item?.receiverIds[0])
                    : Number(item?.emitterId)
            return {
                queryFn: () => serviceUsers.getId(Number(idUser)),
                queryKey: ["user", idUser],
                enabled: !!data,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                refetchIntervalInBackground: false,
            }
        }) || [],
    )

    const items: IFiltersItems[] = useMemo(() => {
        const ITEMS: IFiltersItems[] = []
        if (data && arrayUsers?.every((item) => !item.isLoading)) {
            for (const item of data?.res!) {
                const idUser =
                    Number(item?.emitterId) === Number(userId)
                        ? Number(item?.receiverIds[0])
                        : Number(item?.emitterId)
                const people = arrayUsers.find(
                    (item) =>
                        Number(item?.data?.res?.id) === Number(idUser) &&
                        item?.data?.res?.profile,
                )
                if (people) {
                    ITEMS.push({
                        thread: item!,
                        people: people?.data?.res!,
                    })
                }
            }
        }

        ITEMS.sort((prev, next) => {
            const prevNumber = prev.thread.messages?.at(-1)?.created!
                ? new Date(
                      prev.thread.messages?.at(-1)?.created!,
                  ).getMilliseconds()
                : new Date(prev.thread?.created!).getMilliseconds()

            const nextNumber = next.thread.messages?.at(-1)?.created!
                ? new Date(
                      next.thread.messages?.at(-1)?.created!,
                  ).getMilliseconds()
                : new Date(next.thread?.created).getMilliseconds()

            return prevNumber - nextNumber
        })

        return ITEMS
    }, [arrayUsers, data, userId])

    useEffect(() => {
        console.log("socket socket: ", socket)
        function chatResponse(event: any) {
            console.log("chatResponse event: ", event)
            refetch()
        }

        socket?.on("chatResponse", chatResponse)

        return () => {
            socket?.off("chatResponse", chatResponse)
        }
    }, [socket, refetch])

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
                    {typeof total !== "undefined" ? (
                        <div data-total>
                            <p>{total || 0}</p>
                        </div>
                    ) : null}
                </div>
                <Segments
                    type={systemTheme === "dark" ? "primary" : "optional-1"}
                    active={value}
                    values={SEGMENTS_CHAT}
                    setActive={setValue}
                    classNames={styles.segments}
                />
            </header>
            <SearchBlock {...{ search, setSearch }} />
            <List search={search} items={items} setTotal={setTotal} />
        </section>
    )
}
