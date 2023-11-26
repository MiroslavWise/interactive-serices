"use client"

import { isMobile } from "react-device-detect"

import { Content } from "./components/Content"
import { Glasses } from "@/components/common/Glasses"
import { ButtonClose } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"
import { useWelcomeModal } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function WelcomeModal() {
    const isVisible = useWelcomeModal(({isVisible}) => isVisible)
    const setVisible = useWelcomeModal(({setVisible}) => setVisible)

    function close() {
        setVisible(false)
    }

    return isVisible ? (
        <div
            className={cx("wrapper-fixed", styles.wrapper)}
            data-visible={isVisible}
            data-mobile={isMobile}
        >
            {isMobile ? (
                <>
                    <Content />
                    <Glasses />
                    <ButtonClose
                        position={{
                            right: 12,
                            top: 12,
                        }}
                        onClick={close}
                    />
                </>
            ) : (
                <div data-container>
                    <Content />
                    <ButtonClose
                        position={{
                            right: 12,
                            top: 12,
                        }}
                        onClick={close}
                    />
                    <Glasses />
                </div>
            )}
        </div>
    ) : null
}
