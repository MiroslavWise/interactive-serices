"use client"

import { motion } from "framer-motion"
import { isMobile } from "react-device-detect"

import { cx } from "@/lib/cx"
import { ImageStatic } from "@/components/common/Image"

import styles from "./styles/screens.module.scss"

const title = "Начните дискуссии и не только"
const description =
    "Чтобы создать дискуссию, встречу или отметить событие SOS, кликните по карте и заполните все поля в открывшемся окне."
const placeholder =
    "Важно! Событие SOS предназначено для срочных и критических сообщений. Неправильное использование этой функции может привести к блокировке."

export const Four = () => {
    return (
        <motion.section
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.6 }}
            className={cx(styles.container4)}
            data-mobile={isMobile}
        >
            <div data-absolute-image>
                <ImageStatic
                    src="/png/welcome/four.png"
                    alt="four"
                    width={393}
                    height={1194}
                />
                <div className={styles.divider} />
            </div>
            <div data-block-text>
                <h1>{title}</h1>
                <p>{description}</p>
                <i>{placeholder}</i>
            </div>
        </motion.section>
    )
}
