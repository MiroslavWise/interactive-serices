"use client"

import { useQuery } from "react-query"
import { motion } from "framer-motion"
import { useMemo, useState } from "react"
import { isMobile } from "react-device-detect"

import type { IFriendsResponse } from "@/services/friends/types"
import type { TTypeFriends } from "@/store/types/createDroverFriends"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { Glasses } from "@/components/layout"
import { ListFriends } from "./components/ListFriends"
import { SearchInput } from "@/components/common/Inputs"
import { ButtonClose } from "@/components/common/Buttons"
import { Segments } from "@/components/common/Segments"

import { useAuth } from "@/store/hooks"
import { serviceFriends } from "@/services/friends"
import { SEGMENT_FRIENDS } from "./constants/segments"
import { useDroverFriends } from "@/store/state/useDroverFriends"

import styles from "./styles/style.module.scss"

export function DroverFriends() {
    const { userId } = useAuth()
    const { visibleFriends, dispatchFriends } = useDroverFriends()
    const [segment, setSegment] = useState<ISegmentValues<TTypeFriends>>(
        SEGMENT_FRIENDS[0],
    )
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

    // const filterList: IFriendsResponse[] = useMemo(() => {
    //     return list.filter((item) =>
    //         `${item.profile?.firstName} ${item?.profile?.lastName}`
    //             .toLowerCase()
    //             .includes(search.toLowerCase()),
    //     )
    // }, [list, search])

    return (
        <div className={styles.wrapper} data-mobile={isMobile}>
            <motion.section
                initial={{ opacity: 0, visibility: "hidden" }}
                animate={{ opacity: 1, visibility: "visible" }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0, visibility: "hidden" }}
            >
                {!isMobile && (
                    <ButtonClose
                        onClick={handleClose}
                        position={{
                            top: 12,
                            left: 12,
                        }}
                    />
                )}
                <Glasses />
                <article>
                    <header />
                    {isMobile ? (
                        <div data-close-segment>
                            <Segments
                                type="primary"
                                VALUES={SEGMENT_FRIENDS}
                                active={segment}
                                setActive={setSegment}
                            />
                            <ButtonClose
                                onClick={handleClose}
                                position={{
                                    top: 12,
                                    left: 12,
                                }}
                            />
                        </div>
                    ) : (
                        <Segments
                            type="primary"
                            VALUES={SEGMENT_FRIENDS}
                            active={segment}
                            setActive={setSegment}
                        />
                    )}

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
