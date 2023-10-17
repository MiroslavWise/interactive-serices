"use client"

import { useQuery } from "react-query"
import { isMobile } from "react-device-detect"

import { useAuth } from "@/store/hooks"
import { serviceLogs } from "@/services/logs"

import styles from "./style.module.scss"

export default function Notifications() {
    const { userId } = useAuth()
    const { data } = useQuery({
        queryFn: serviceLogs.get,
        queryKey: ["logs"],
    })

    return <ul className={styles.wrapper}></ul>
}
