"use client"

import { motion } from "framer-motion"
import { isMobile } from "react-device-detect"
import { useState, useMemo, type ReactNode } from "react"

import { IResetEmailData } from "./types/types"

import { ButtonClose } from "@/components/common/Buttons"
import { Glasses } from "./components/Glasses"

import { useAuth } from "@/store/hooks/useAuth"
import { useVisibleAndTypeAuthModal } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function ModalSign() {
    const { isAuth } = useAuth()
    const { type, visible, setVisibleAndType } = useVisibleAndTypeAuthModal()

    return !isAuth ? (
        visible ? (
            <motion.div
                className={isMobile ? styles.overviewMobile : styles.overlay}
                data-visible={visible}
                initial={{ opacity: 0, visibility: "hidden" }}
                animate={{ opacity: 1, visibility: "visible" }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, visibility: "hidden" }}
            >
                {isMobile ? (
                    <>
                        <div data-content>
                            {/* <HeaderModal
                            email={valueEmail.email}
                            typeVerification={typeVerification}
                        />
                        {content} */}
                        </div>
                        <Glasses />
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
                        <div data-content>
                            {/* <HeaderModal
                                    email={valueEmail.email}
                                    typeVerification={typeVerification}
                                />
                                {content} */}
                        </div>
                        <Glasses />
                    </div>
                )}
            </motion.div>
        ) : null
    ) : null
}
