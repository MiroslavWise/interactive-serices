"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { isMobile } from "react-device-detect"

import type { TFilterFieldBottom } from "./types"

import { PopupFilter } from "./PopupFilter"
import { ButtonFilter } from "@/components/common/Buttons/ButtonFilter"

import styles from "./styles/style.module.scss"

export const FilterFieldBottom: TFilterFieldBottom = ({}) => {
    const [active, setActive] = useState(false)

    const handleClick = () => {
        setActive((prev) => !prev)
    }

    return !isMobile ? (
        <motion.div
            className={styles.container}
            initial={{ bottom: -100 }}
            animate={{ bottom: 40 }}
            transition={{ duration: 0.5 }}
            exit={{ bottom: -100 }}
        >
            <ButtonFilter
                label="Настроить фильтры"
                active={active}
                handleClick={handleClick}
            />
            <PopupFilter visible={active} setVisible={setActive} />
        </motion.div>
    ) : null
}
