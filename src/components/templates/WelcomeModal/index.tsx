"use client"

import { motion } from "framer-motion"
import { isMobile } from "react-device-detect"

import { Content } from "./components/Content"
import { Glasses } from "@/components/common/Glasses"
import { ButtonClose } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"
import { useWelcomeModal } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function WelcomeModal() {
    const { isVisible, setVisible } = useWelcomeModal()

    function close() {
        setVisible(false)
    }

    return isVisible ? (
        isMobile ? (
            <div className={styles.wrapperMobile} data-visible={isVisible}>
                <ButtonClose
                    position={{
                        right: 12,
                        top: 12,
                    }}
                    onClick={close}
                />
                <Content />
                <Glasses />
            </div>
        ) : (
            <div className={styles.wrapper} data-visible={isVisible}>
                <motion.div
                    data-container
                    className={styles.container}
                    initial={{ opacity: 0, visibility: "hidden" }}
                    animate={{ opacity: 1, visibility: "visible" }}
                    transition={{ duration: 0.5 }}
                    exit={{ opacity: 0, visibility: "hidden" }}
                >
                    <Content />
                    <ButtonClose
                        position={{
                            right: 12,
                            top: 12,
                        }}
                        onClick={close}
                    />
                    <Glasses />
                </motion.div>
            </div>
        )
    ) : null
}
