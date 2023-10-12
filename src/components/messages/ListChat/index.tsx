"use client"

import { useQueries, useQuery } from "react-query"
import { useEffect, useMemo, useState } from "react"
import { isMobile } from "react-device-detect"

import type { IFiltersItems } from "./components/types/types"

import { List } from "./components/List"
import { SearchBlock } from "./components/SearchBlock"

import { useAuth } from "@/store/hooks"
import { serviceUsers } from "@/services/users"
import { serviceThreads } from "@/services/threads"

import styles from "./styles/style.module.scss"

export const ListChat = () => {
    const { userId } = useAuth()
    const [search, setSearch] = useState("")
    const { data } = useQuery({
        queryFn: () => serviceThreads.getUserId(userId!),
        queryKey: ["threads", `user=${userId}`],
        refetchOnMount: true,
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
                enabled: !!data?.res,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                refetchIntervalInBackground: false,
            }
        }) || [],
    )

    const items: IFiltersItems[] = useMemo(() => {
        if (!data?.res) {
            return []
        }
        const ITEMS: IFiltersItems[] = []
        if (data?.res && arrayUsers?.every((item) => !item.isLoading)) {
            data?.res?.forEach((item) => {
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
            })
        }

        return ITEMS
    }, [arrayUsers, data, userId])

    const filters: IFiltersItems[] = useMemo(() => {
        return (
            items?.filter(
                (item) =>
                    `${item?.people?.profile?.firstName} ${item?.people?.profile?.lastName}`
                        ?.toLowerCase()
                        ?.includes(search?.toLowerCase()),
            ) || []
        )
    }, [items, search])

    const total = useMemo(() => {
        return filters?.length || 0
    }, [filters])

    return isMobile ? (
        <section className={styles.containerMobile}>
            <SearchBlock {...{ search, setSearch }} />
            <List items={items} />
        </section>
    ) : (
        <section className={styles.container}>
            <header>
                <div className={styles.totalNumber}>
                    <h4>Сообщения</h4>
                    {typeof total !== "undefined" ? (
                        <div className={styles.divNumber}>
                            <p>{total || 0}</p>
                        </div>
                    ) : null}
                </div>
            </header>
            <SearchBlock {...{ search, setSearch }} />
            <List items={filters} />
        </section>
    )
}
