"use client"

import { isMobile } from "react-device-detect"

import { Content } from "./content/content"
import { ButtonClose } from "@/components/common/Buttons"
import { GlassesBanner } from "@/components/common/Glasses"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store/hooks/useAuth"
import { useModalAuth } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function ModalSign() {
    const { isAuth } = useAuth()
    const { type, visible, dispatchAuthModal: setVisibleAndType } = useModalAuth()

    const buttonClose = (
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
    )

    return !isAuth ? (
        <div
            className={cx(
                "wrapper-fixed",
                isMobile ? styles.overviewMobile : styles.overlay,
            )}
            data-visible={visible}
        >
            {isMobile ? (
                <>
                    {buttonClose}
                    <div data-content>
                        <Content />
                    </div>
                    <GlassesBanner />
                </>
            ) : (
                <div data-content>
                    {buttonClose}
                    <Content />
                    <GlassesBanner />
                </div>
            )}
        </div>
    ) : null
}
