"use client"

import { type ChangeEvent, type KeyboardEvent, useRef, useState } from "react"
import QRCode from "react-qr-code"
// import { motion } from "framer-motion"

import type { TContentFirstLoginQR } from "./types/types"

import { ButtonFill } from "@/components/common/Buttons"

import { useUpdateProfile, useVisibleAndTypeAuthModal } from "@/store/hooks"
import { useAuth } from "@/store/hooks/useAuth"
import { useTokenHelper } from "@/helpers/auth/tokenHelper"

import styles from "../styles/style.module.scss"

export const ContentFirstLoginQR: TContentFirstLoginQR = ({ valueSecret }) => {
    const { setToken } = useAuth()
    const [loading, setLoading] = useState(false)
    const { setVisibleAndType } = useVisibleAndTypeAuthModal()
    const { setVisible } = useUpdateProfile()
    //todo
    const [inputValues, setInputValues] = useState(["", "", "", "", "", ""])
    const [errorCode, setErrorCode] = useState("")
    const inputRefs = useRef<HTMLInputElement[]>([])
    const handleCopyText = () => {
        navigator.clipboard.writeText(valueSecret.secret)
    }

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        let { value } = event.target

        const newInputValues = [...inputValues]
        newInputValues[index] = value
        setInputValues(newInputValues)

        if (index < inputRefs.current.length - 1 && value.length > 0) {
            const nextInputRef = inputRefs.current[index + 1]
            nextInputRef.focus()
        }
    }

    const handleKeyDown = (
        event: KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (
            event.key === "Backspace" &&
            index > 0 &&
            inputValues[index] === ""
        ) {
            const prevInputRef = inputRefs.current[index - 1]
            prevInputRef.focus()
            const newInputValues = [...inputValues]
            newInputValues[index - 1] = ""
            setInputValues(newInputValues)
        }
    }

    const onInputValues = () => {
        setLoading(true)
        useTokenHelper
            .serviceOtp({ code: inputValues.join("") })
            .then((response) => {
                if (response.ok) {
                    setVisible(true)
                    setToken({
                        ok: true,
                        token: response?.res?.access_token!,
                        refreshToken: response?.res?.refresh_token!,
                        userId: response?.res?.id!,
                        expiration: response?.res?.expires_in!,
                    })
                }
                if (!response.ok) {
                    if (
                        response.error?.code === 401 &&
                        response?.error?.message === "2fa code is not correct"
                    ) {
                        setErrorCode(
                            "Код, введённый вами, не является действительным!"
                        )
                    }
                }
            })
            .finally(() => {
                setVisibleAndType({ visible: false, type: null })
                setLoading(false)
            })
    }

    return (
        <div className={styles.contentFirstLogin}>
            <QRCode
                size={256}
                value={valueSecret.url}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 256 256`}
            />
            <h3 onClick={handleCopyText}>{valueSecret.secret}</h3>
            <div className={styles.inputs}>
                {inputValues.map((_, index) => (
                    <input
                        key={index}
                        //@ts-ignore
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        type="text"
                        placeholder={"0"}
                        pattern="[0-9]"
                        maxLength={1}
                        onChange={(event) => handleChange(event, index)}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                        onClick={() => {
                            setInputValues((prev) => prev.map((_) => ""))
                            inputRefs.current[0].focus()
                        }}
                    />
                ))}
            </div>
            {errorCode ? (
                <p
                    className="error-p"
                    style={{ marginTop: -15, marginBottom: -15 }}
                >
                    {errorCode}
                </p>
            ) : null}
            <ButtonFill
                disabled={
                    loading ||
                    inputValues.filter((item) => item !== "").length !== 6
                }
                classNames="w-100"
                label="Подтвердить код"
                handleClick={onInputValues}
            />
        </div>
    )
}
