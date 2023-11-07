"use client"

import { motion } from "framer-motion"
import { isMobile } from "react-device-detect"

import { ButtonClose } from "@/components/common/Buttons"
import { GlassesBanner } from "@/components/common/Glasses"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store/hooks/useAuth"
import { useVisibleAndTypeAuthModal } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function ModalSign() {
    const { isAuth } = useAuth()
    const { type, visible, setVisibleAndType } = useVisibleAndTypeAuthModal()

    return !isAuth ? (
        visible ? (
            <motion.div
                className={cx(
                    "wrapper-fixed",
                    isMobile ? styles.overviewMobile : styles.overlay,
                )}
                data-visible={visible}
                initial={{ opacity: 0, visibility: "hidden" }}
                animate={{ opacity: 1, visibility: "visible" }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, visibility: "hidden" }}
            >
                {isMobile ? (
                    <>
                        <ButtonClose
                            onClick={() =>
                                setVisibleAndType({
                                    visible: false,
                                    type: type,
                                })
                            }
                            position={{
                                right: 12,
                                top: 12,
                            }}
                        />
                        <div data-content></div>
                        <GlassesBanner />
                    </>
                ) : (
                    <div data-modal>
                        <ButtonClose
                            onClick={() =>
                                setVisibleAndType({
                                    visible: false,
                                    type: type,
                                })
                            }
                            position={{
                                right: 12,
                                top: 12,
                            }}
                        />
                        <div data-content></div>
                        <GlassesBanner />
                    </div>
                )}
            </motion.div>
        ) : null
    ) : null
}
