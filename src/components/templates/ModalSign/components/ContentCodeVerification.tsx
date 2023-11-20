"use client"

import {
    useRef,
    useState,
    useEffect,
    type ChangeEvent,
    type KeyboardEvent,
} from "react"

import type { TContentCodeVerification } from "../types/types"

import { Button } from "@/components/common"

import { useModalAuth } from "@/store/hooks"

import styles from "../styles/form.module.scss"

export const ContentCodeVerification: TContentCodeVerification = ({
    typeVerification,
    valueEmail,
}) => {
    const [loading, setLoading] = useState(false)
    const [inputValues, setInputValues] = useState(Array(4).fill(""))
    const [errorCode, setErrorCode] = useState("")
    const inputRefs = useRef<HTMLInputElement[]>([])
    const { dispatchAuthModal: setVisibleAndType } = useModalAuth()

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        const { value } = event.target
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
        index: number,
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
    }

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }
    }, [])

    return (
        <div className={styles.contentOtpCode}>
            <div className={styles.inputs}>
                {inputValues.map((_, index) => (
                    <input
                        className={styles.checking}
                        key={index}
                        // @ts-ignore
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        type="text"
                        placeholder={"0"}
                        pattern="/[0-9]/"
                        maxLength={1}
                        onChange={(event) => handleChange(event, index)}
                        onKeyDown={(event) => handleKeyDown(event, index)}
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
            <Button
                type="submit"
                typeButton="fill-primary"
                label={`Подтвердить ${
                    typeVerification === "email"
                        ? "email"
                        : typeVerification === "phone"
                        ? "номер"
                        : ""
                }`}
                className="w-100"
                loading={loading}
                disabled={
                    inputValues.filter((item) => item !== "").length !== 4
                }
                onClick={onInputValues}
            />
            <section className={styles.Register}>
                <p>
                    Не получили{" "}
                    {typeVerification === "email"
                        ? "email"
                        : typeVerification === "phone"
                        ? "код"
                        : ""}
                    ?
                </p>
                <a
                    onClick={() =>
                        setVisibleAndType({ type: "ForgotPassword" })
                    }
                >
                    {" "}
                    Отправить еще раз
                </a>
            </section>
        </div>
    )
}
