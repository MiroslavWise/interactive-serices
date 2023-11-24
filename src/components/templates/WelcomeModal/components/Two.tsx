"use client"

import { isMobile } from "react-device-detect"
import { motion } from "framer-motion"

import { cx } from "@/lib/cx"
import { ImageStatic } from "@/components/common/Image"

import styles from "./styles/screens.module.scss"

const title = "Заполните свой профиль"
const description =
    "Чтобы стать полноценным участником сообщества Sheira, заполните свой профиль, предоставив адрес."
const placeholder =
    "Важно! Для создания событий на карте необходимо подтвердить электронную почту и указать адрес"

export const Two = () => {
    return (
        <motion.section
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.6 }}
            className={cx(styles.container2)}
            data-mobile={isMobile}
        >
            <div data-absolute-image>
                <ImageStatic
                    src="/png/welcome/two.png"
                    alt="two"
                    width={790}
                    height={342}
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
