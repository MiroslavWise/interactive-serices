"use client"

import { isMobile } from "react-device-detect"

import type { TContentSelectVerification } from "./types/types"

import { ButtonSelection } from "./components/ButtonSelection"

// import { useVisibleAndTypeAuthModal } from "@/store/hooks"
import { cx } from "@/lib/cx"

import styles from "../styles/style.module.scss"

export const ContentSelectVerification: TContentSelectVerification = ({
    typeVerification,
    setTypeVerification,
}) => {
    const handleVerification = async (value: "phone" | "email") => {
        setTypeVerification(value)
    }

    return (
        <div className={cx(styles.contentRow, isMobile && styles.isMobile)}>
            <ButtonSelection
                active={typeVerification === "phone"}
                onClick={() => handleVerification("phone")}
                label="Telegram номер"
                image="/svg/telegram_selection.svg"
            />
            <ButtonSelection
                active={typeVerification === "email"}
                onClick={() => handleVerification("email")}
                label="Email адрес"
                image="/svg/email_selection.svg"
            />
        </div>
    )
}
