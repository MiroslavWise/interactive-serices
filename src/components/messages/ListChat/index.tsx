"use client"

import { useTheme } from "next-themes"
import { useMemo, useState } from "react"
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

export const ListChat = () => {
    const { userId } = useAuth()
    const { systemTheme } = useTheme()
    const [search, setSearch] = useState("")
    const [value, setValue] = useState<ISegmentValues<TTypeProviderThreads>>(
        SEGMENTS_CHAT[0],
    )
    const [total, setTotal] = useState(0)

    const { data } = useQuery({
        queryFn: () =>
            serviceThreads.get({ user: userId!, provider: value.value }),
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

        return ITEMS
    }, [arrayUsers, data, userId])

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
