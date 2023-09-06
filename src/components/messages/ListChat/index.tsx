"use client"

import { useEffect } from "react"
import { useQuery } from "react-query"
import { isMobile } from "react-device-detect"

import { List } from "./components/List"
import { SearchBlock } from "./components/SearchBlock"

import { profileService } from "@/services/profile"

import styles from "./styles/style.module.scss"

export const ListChat = () => {
    const { data, isLoading, error } = useQuery(["profiles"], () =>
        profileService.getProfiles({ limit: 20 }),
    )

    return isMobile ? (
        <section className={styles.containerMobile}>
            <SearchBlock />
            <List items={data?.res || []} />
        </section>
    ) : (
        <section className={styles.container}>
            <header>
                <div className={styles.totalNumber}>
                    <h4>Сообщения</h4>
                    {data?.ok ? (
                        <div className={styles.divNumber}>
                            <p>{data?.res?.length}</p>
                        </div>
                    ) : null}
                </div>
            </header>
            <SearchBlock />
            <List items={data?.res || []} />
        </section>
    )
}
