"use client"

import { useEffect } from "react"
import { redirect } from "next/navigation"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

import { MotionUL } from "@/components/common/Motion"
import { Badges } from "@/components/profile/StatisticAndFeedback/components/Budges"
import { MobileInteractive, MobileMainInfo, StatisticAndFeedback, MainInfo } from "@/components/profile"

import { serviceUsers } from "@/services/users"
import { useToast } from "@/helpers/hooks/useToast"

import styles from "@/scss/page.module.scss"

let fetchOut = false

export default function UserId() {
    const id = useSearchParams()?.get("id")
    const { on } = useToast()
    const { data, isLoading } = useQuery({
        queryFn: () => serviceUsers.getId(id!),
        queryKey: ["user", id],
        enabled: id !== "undefined" && id !== "null" && typeof id !== undefined,
    })

    useEffect(() => {
        if (id === "undefined" || typeof id === "undefined" || id === "null") {
            if (!fetchOut) on({ message: "Данный аккаунт не существует или приватный" }, "warning")
            fetchOut = true
            return redirect("/")
        }

        if (data?.ok === false) {
            if (!fetchOut) on({ message: "Данный аккаунт не существует или приватный" }, "warning")
            fetchOut = true
            return redirect("/")
        }
    }, [data, id, isLoading])

    return (
        <div className={styles.page}>
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
