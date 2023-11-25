"use client"

import Image from "next/image"
import { useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"

import { useAuth } from "@/store/hooks"
import { serviceFriends } from "@/services/friends"
import { useDroverFriends } from "@/store/state/useDroverFriends"

import styles from "./styles/button-friends.module.scss"

export const ButtonFriends = () => {
    const { dispatchFriends } = useDroverFriends((_) => ({
        dispatchFriends: _.dispatchFriends,
    }))
    const { userId } = useAuth((_) => ({ userId: _.userId }))

    const { data } = useQuery({
        queryFn: () => serviceFriends.get(),
        queryKey: ["friends", `user=${userId}`, `filter=list`],
        enabled: !!userId,
    })

    function handleOpen() {
        dispatchFriends({ visible: true })
    }

    const friends = useMemo(() => {
        if (!data?.res) return null
        return data?.res?.length
    }, [data?.res])

    return (
        <div
            className={styles.container}
            onClick={handleOpen}
            data-mobile={isMobile}
        >
            <p>{friends ? `Всего ${friends} друга` : `Нет друзей`}</p>
            <Image
                src="/svg/arrow-right.svg"
                alt="arrow-right"
                width={24}
                height={24}
                unoptimized
            />
        </div>
    )
}
