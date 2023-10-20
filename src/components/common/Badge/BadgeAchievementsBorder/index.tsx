"use client"

import { motion } from "framer-motion"

import type { TBadgeAchievements } from "../types/types"

import styles from "./style.module.scss"

export const BadgeAchievementsBorder: TBadgeAchievements = ({
    title,
    total,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.8 }}
            className={styles.container}
        >
            <div className={styles.titleAndNumber}>
                <p>{title}</p>
                <motion.h2
                    initial={{ opacity: 0, visibility: "hidden" }}
                    animate={{ opacity: 1, visibility: "visible" }}
                    exit={{ opacity: 0, visibility: "hidden" }}
                    transition={{ duration: 0.5 }}
                >
                    {total}
                </motion.h2>
            </div>
        </motion.div>
    )
}
