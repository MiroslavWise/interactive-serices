"use client"

import { useQuery } from "react-query"
import { motion } from "framer-motion"

import { serviceBarters } from "@/services/barters"

import styles from "./styles/notice-barter.module.scss"

export const NoticeBarter = ({ idBarter }: { idBarter: number }) => {
    const { data } = useQuery({
        queryFn: () => serviceBarters.getId(idBarter),
        queryKey: ["barters", `id=${idBarter}`],
        enabled: !!idBarter,
    })

    return (
        <motion.header
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, visibility: "hidden" }}
            className={styles.wrapper}
        ></motion.header>
    )
}
