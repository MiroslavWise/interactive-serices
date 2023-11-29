"use client"

import dayjs from "dayjs"
import { useQuery } from "@tanstack/react-query"

import type { TCardReview } from "./types"

import { Rate } from "@/components/common/Rate"

import { usePush } from "@/helpers"
import { serviceUsers } from "@/services/users"

import styles from "./style.module.scss"

export const CardReview: TCardReview = (props) => {
    const { handleReplace } = usePush()
    const {
        id,
        userId,
        targetId,
        provider,
        barterId,
        rating,
        message,
        status,
        created,
        updated,
    } = props

    const { data } = useQuery({
        queryFn: () => serviceUsers.getId(userId!),
        queryKey: ["user", id],
        enabled: !!id && !!userId,
    })

    return (
        <li className={styles.container}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <div className={styles.userDate}>
                        <a onClick={() => handleReplace(`user?id=${userId}`)}>
                            @{data?.res?.profile?.username}
                        </a>
                        <p>{dayjs(updated).format("DD/MM/YYYY")}</p>
                    </div>
                    <Rate rate={rating} />
                </header>
                <p className={styles.description}>{message}</p>
            </div>
        </li>
    )
}
