"use client"

import { useQuery } from "react-query"
import { useMemo, useState } from "react"
import { isMobile } from "react-device-detect"

import { List } from "./components/List"
import { SearchBlock } from "./components/SearchBlock"

import { useAuth } from "@/store/hooks"
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

    const total = useMemo(() => {
        return data?.res?.length || 0
    }, [data?.res])

    return isMobile ? (
        <section className={styles.containerMobile}>
            <SearchBlock {...{ search, setSearch }} />
            <List items={data?.res || []} />
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
            <List items={data?.res || []} />
        </section>
    )
}
