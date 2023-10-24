"use client"

import { motion } from "framer-motion"

import { ButtonClose } from "@/components/common/Buttons"

import { useDroverFriends } from "@/store/state/useDroverFriends"

import styles from "./styles/style.module.scss"
import { Glasses } from "@/components/layout"
import { Segments } from "@/components/common/Segments"
import { useState } from "react"
import { SEGMENT_FRIENDS } from "./constants/segments"
import { TTypeFriends } from "@/store/types/createDroverFriends"
import { ISegmentValues } from "@/components/common/Segments/types"
import { SearchInput } from "@/components/common/Inputs"
import { ListFriends } from "./components/ListFrends"

export function DroverFriends() {
    const { visibleFriends, dispatchFriends } = useDroverFriends()
    const [segment, setSegment] = useState<ISegmentValues<TTypeFriends>>(
        SEGMENT_FRIENDS[0],
    )
    const [search, setSearch] = useState("")

    function handleClose() {
        dispatchFriends({ visible: false })
    }

    return (
        <div className={styles.wrapper}>
            <motion.section
                initial={{ opacity: 0, visibility: "hidden" }}
                animate={{ opacity: 1, visibility: "visible" }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0, visibility: "hidden" }}
            >
                <ButtonClose
                    onClick={handleClose}
                    position={{
                        top: 12,
                        left: 12,
                    }}
                />
                <Glasses />
                <article>
                    <header>
                        <p>Мои друзья</p>
                    </header>
                    <Segments
                        type="primary"
                        VALUES={SEGMENT_FRIENDS}
                        active={segment}
                        setActive={setSegment}
                    />
                    <div data-search-block>
                        <SearchInput
                            value={search}
                            setValue={setSearch}
                            placeholder="Поиск пользователя по имени"
                        />
                    </div>
                    <ListFriends list={[]} type={segment.value} />
                </article>
            </motion.section>
        </div>
    )
}
