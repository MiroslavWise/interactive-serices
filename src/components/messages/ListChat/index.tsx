"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { isMobile } from "react-device-detect"

import type { TTypeProviderThreads } from "@/services/threads/types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { List } from "./components/List"
import { SearchBlock } from "./components/SearchBlock"
import { Segments } from "@/components/common/Segments"

import { SEGMENTS_CHAT } from "./constants/segments"

import styles from "./styles/style.module.scss"

export const ListChat = () => {
    const { systemTheme } = useTheme()
    const [search, setSearch] = useState("")
    const [value, setValue] = useState<ISegmentValues<TTypeProviderThreads>>(
        SEGMENTS_CHAT[0],
    )
    const [total, setTotal] = useState(0)

    return isMobile ? (
        <section className={styles.containerMobile}>
            <SearchBlock {...{ search, setSearch }} />
            <List search={search} provider={value.value} setTotal={setTotal} />
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
            <List search={search} provider={value.value} setTotal={setTotal} />
        </section>
    )
}
