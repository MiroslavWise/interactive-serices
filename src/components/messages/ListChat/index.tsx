"use client"

import { useEffect } from "react"
import { isMobile } from "react-device-detect"

import { List } from "./components/List"
import { SearchBlock } from "./components/SearchBlock"

import { useAuth } from "@/store/hooks"
import { useThread } from "@/store/state/useThreads"
import { useMessages } from "@/store/state/useMessages"
import { useSearchChats } from "@/helpers/hooks/useSearchChats"

import styles from "./styles/style.module.scss"

export const ListChat = () => {
    const { setPhotoAndName } = useMessages()
    const { threads, total, getThreads } = useThread()
    const { filters } = useSearchChats()

    const { userId } = useAuth()

    useEffect(() => {
        if (userId) {
            getThreads(userId!)
        }
    }, [userId, getThreads])

    useEffect(() => {
        if (threads && threads.length) {
            for (const thread of threads) {
                setPhotoAndName({
                    idThread: thread.id!,
                    idUser: thread?.receiverIds?.[0]!,
                })
            }
        }
    }, [threads, setPhotoAndName])

    return isMobile ? (
        <section className={styles.containerMobile}>
            <SearchBlock />
            <List items={filters} />
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
            <List items={filters} />
        </section>
    )
}
