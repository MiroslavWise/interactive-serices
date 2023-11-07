"use client"

import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import {
    MobileInteractive,
    MobileMainInfo,
    StatisticAndFeedback,
    MainInfo,
} from "@/components/profile"
import { MotionUL } from "@/components/common/Motion"
import { Badges } from "@/components/profile/StatisticAndFeedback/components/Budges"

import { cx } from "@/lib/cx"
import { usePush } from "@/helpers"
import { serviceUsers } from "@/services/users"
import { useToast } from "@/helpers/hooks/useToast"

import styles from "@/scss/page.module.scss"

let fetchOut = false

export default function UserId() {
    const { on } = useToast()
    const searchParams = useSearchParams()
    const { handlePush } = usePush()
    const id = searchParams?.get("id")
    const { data, isLoading } = useQuery({
        queryFn: () => serviceUsers.getId(id!),
        queryKey: ["user", id],
        enabled: id !== "undefined" && id !== "null" && typeof id !== undefined,
    })

    useEffect(() => {
        if (id === "undefined" || typeof id === "undefined" || id === "null") {
            if (!fetchOut)
                on(
                    { message: "Данный аккаунт не существует или приватный" },
                    "warning",
                )
            fetchOut = true
            return handlePush("/")
        }

        if (data?.ok === false) {
            if (!fetchOut)
                on(
                    { message: "Данный аккаунт не существует или приватный" },
                    "warning",
                )
            fetchOut = true
            return handlePush("/")
        }
    }, [data, id, isLoading, handlePush, on])

    return (
        <div className={cx(styles.page, isMobile && styles.mobile)}>
            {isMobile ? (
                <MotionUL classNames={[styles.containerMobile]} id="user-id">
                    <MobileMainInfo user={data?.res!} />
                    <Badges />
                    <MobileInteractive />
                </MotionUL>
            ) : (
                <section className={styles.container}>
                    <MainInfo user={data?.res!} />
                    <StatisticAndFeedback />
                </section>
            )}
        </div>
    )
}
