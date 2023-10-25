"use client"

import { motion } from "framer-motion"

import { ButtonClose } from "@/components/common/Buttons"

import { useDroverFriends } from "@/store/state/useDroverFriends"

import styles from "./styles/style.module.scss"
import { Glasses } from "@/components/layout"
import { Segments } from "@/components/common/Segments"
import { useMemo, useState } from "react"
import { SEGMENT_FRIENDS } from "./constants/segments"
import { TTypeFriends } from "@/store/types/createDroverFriends"
import { ISegmentValues } from "@/components/common/Segments/types"
import { SearchInput } from "@/components/common/Inputs"
import { ListFriends } from "./components/ListFrends"
import { useQuery } from "react-query"
import { serviceFriends } from "@/services/friends"
import { useAuth } from "@/store/hooks"
import { IFriendsResponse } from "@/services/friends/types"

export function DroverFriends() {
    const { userId } = useAuth()
    const { visibleFriends, dispatchFriends } = useDroverFriends()
    const [segment, setSegment] = useState<ISegmentValues<TTypeFriends>>(
        SEGMENT_FRIENDS[0],
    )

    let re: Omit<TTypeFriends, "list">

    const [search, setSearch] = useState("")
    const { data } = useQuery({
        queryFn: () =>
            serviceFriends.get(
                ["request", "response"].includes(segment.value)
                    ? { filter: segment.value as Exclude<TTypeFriends, "list"> }
                    : undefined,
            ),
        queryKey: ["friends", `user=${userId}`, `filter=${segment.value}`],
        enabled: visibleFriends && !!userId,
    })

    function handleClose() {
        dispatchFriends({ visible: false })
    }

    const list: IFriendsResponse[] = useMemo(() => {
        if (!data?.res) {
            return []
        }
        return data?.res || []
    }, [data?.res])

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
                    <ListFriends list={list} type={segment.value} />
                </article>
            </motion.section>
        </div>
    )
}
