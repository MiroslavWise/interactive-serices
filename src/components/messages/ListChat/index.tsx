"use client"

import { useEffect } from "react"
import { isMobile } from "react-device-detect"

import { List } from "./components/List"
import { SearchBlock } from "./components/SearchBlock"

import { useAuth } from "@/store/hooks"

import styles from "./styles/style.module.scss"
import { useThread } from "@/store/state/useThreads"

export const ListChat = () => {
    const { threads, total, getThreads } = useThread((state) => ({
        threads: state.threads,
        total: state.total,
        getThreads: state.getThreads,
    }))

    const { userId } = useAuth()

    useEffect(() => {
        if (userId) {
            getThreads(userId!)
        }
    }, [userId, getThreads])

    return isMobile ? (
        <section className={styles.containerMobile}>
            <SearchBlock />
            <List items={threads || []} />
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
            <SearchBlock />
            <List items={threads || []} />
        </section>
    )
}
