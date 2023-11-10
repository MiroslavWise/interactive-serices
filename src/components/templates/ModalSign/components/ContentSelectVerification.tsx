"use client"

import { isMobile } from "react-device-detect"

import type { TContentSelectVerification } from "../types/types"

import { ButtonSelection } from "./ButtonSelection"

import styles from "../styles/form.module.scss"

export const ContentSelectVerification: TContentSelectVerification = ({
    typeVerification,
    setTypeVerification,
}) => {
    const handleVerification = async (value: "phone" | "email") => {
        setTypeVerification(value)
    }

    return (
        <div className={styles.contentRow} data-mobile={isMobile}>
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
