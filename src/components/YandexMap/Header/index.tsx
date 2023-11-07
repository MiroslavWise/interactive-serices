"use client"

import { memo } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"

import type { THeaderMobile } from "./types"

import { SearchElementMap } from "@/components/common/Inputs"

import { useAuth } from "@/store/hooks"
import { serviceNotifications } from "@/services/notifications"
import { useVisibleNotifications } from "@/store/state/useVisibleNotifications"

import styles from "./styles/style.module.scss"

export const Header: THeaderMobile = memo(function $Header({
    handleAddressLocation,
}) {
    const { token } = useAuth()
    const { dispatchVisibleNotifications } = useVisibleNotifications()
    const { data: dataNotifications } = useQuery({
        queryFn: () => serviceNotifications.get({ order: "DESC" }),
        queryKey: ["notifications"],
    })

    return isMobile ? (
        <motion.div
            className={styles.header}
            initial={{ top: -100, opacity: 0, visibility: "hidden" }}
            animate={{ top: 0, opacity: 1, visibility: "visible" }}
            transition={{ duration: 0.5 }}
            exit={{ top: -100, opacity: 0, visibility: "hidden" }}
        >
            <div className={styles.container}>
                <div className={styles.logoAndNotifications}>
                    <Image
                        src="/logo/wordmark.svg"
                        alt="logo"
                        width={107}
                        height={28.3}
                    />
                    <div
                        className={styles.containerNotification}
                        onClick={() =>
                            dispatchVisibleNotifications({ visible: true })
                        }
                    >
                        <Image
                            src="/svg/bell.svg"
                            alt="bell"
                            width={22}
                            height={22}
                        />
                        {dataNotifications?.res?.length ? (
                            <div className={styles.badge}>
                                <span>
                                    {dataNotifications?.res?.length || 0}
                                </span>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className={styles.segments}>
                    <SearchElementMap
                        handleAddressLocation={handleAddressLocation}
                    />
                </div>
            </div>
        </motion.div>
    ) : (
        <motion.div
            id="headerRef"
            className={styles.containerSearchTop}
            initial={{ top: -100 }}
            animate={{ top: !!token ? 77 + 24 : 40 }}
            transition={{ duration: 0.5 }}
            exit={{ top: -100 }}
            style={{
                top: !!token ? 77 + 24 : 40,
            }}
        >
            <SearchElementMap handleAddressLocation={handleAddressLocation} />
        </motion.div>
    )
})
