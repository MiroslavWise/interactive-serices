"use client"

import {
    useRef,
    useState,
    useEffect,
    type ChangeEvent,
    type KeyboardEvent,
    useCallback,
} from "react"
import { isMobile } from "react-device-detect"

import type { TContentOtpCode } from "./types/types"

import { ButtonFill } from "@/components/common/Buttons"

import { useTokenHelper } from "@/helpers"
import { usersService } from "@/services/users"
import { useAuth } from "@/store/hooks/useAuth"
import { useVisibleAndTypeAuthModal, useUpdateProfile } from "@/store/hooks"

import styles from "../styles/style.module.scss"

export const ContentOtpCode: TContentOtpCode = ({}) => {
    const { setToken, changeAuth } = useAuth()
    const [loading, setLoading] = useState(false)
    const { setVisibleAndType } = useVisibleAndTypeAuthModal()
    const { setVisible } = useUpdateProfile()
    const [inputValues, setInputValues] = useState(Array(6).fill(""))
    const [errorCode, setErrorCode] = useState("")
    const inputRefs = useRef<HTMLInputElement[]>([])
    async function clip() {
        const text = await navigator.clipboard.readText()
        const split = text.split("")
        if (
            split.map((item) => /[0-9]/.test(item)).every(Boolean) &&
            split.length === 6
        ) {
            split.forEach((item, index) => {
                inputRefs.current[index].value = item
                setInputValues((state) =>
                    state.map((_, indexValue) =>
                        index === indexValue ? item : _,
                    ),
                )
            })
        }
    }
    //
    const handleChange = (
        event: ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        const { value } = event.target
        const newInputValues = [...inputValues]
        newInputValues[index] = value
        setInputValues((state) =>
            state.map((item, indexMap) => (index === indexMap ? value : item)),
        )
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
            setInputValues((state) =>
                state.map((item, indexMap) => (index === indexMap ? "" : item)),
            )
        }
    }

    const onInputValues = useCallback(() => {
        setLoading(true)
        useTokenHelper
            .serviceOtp({ code: inputValues.join("") })
            .then((response) => {
                if (response.ok) {
                    usersService.getId(response?.res?.id!).then((data) => {
                        setErrorCode("")
                        setToken({
                            ok: true,
                            token: response?.res?.accessToken!,
                            refreshToken: response?.res?.refreshToken!,
                            userId: response?.res?.id!,
                            expiration: response?.res?.expiresIn!,
                        })
                        if (!data?.res?.profile) {
                            setVisible(true)
                            return
                        }
                        if (!!data?.res?.profile) {
                            changeAuth()
                        }
                        setVisibleAndType({ type: null, visible: false })
                        return
                    })
                }
                if (!response.ok) {
                    if (
                        response.error?.code === 401 &&
                        response?.error?.message === "2fa code is not correct"
                    ) {
                        setErrorCode(
                            "Код, введённый вами, не является действительным!",
                        )
                    }
                    setLoading(false)
                }
            })
    }, [inputValues, setVisible, changeAuth, setToken, setVisibleAndType])

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }
    }, [])

    useEffect(() => {
        if (
            inputValues
                .map((item) => /[0-9]/.test(item))
                .every((item) => !!item)
        ) {
            onInputValues()
        }
    }, [inputValues, onInputValues])

    return (
        <div className={styles.contentOtpCode}>
            <div className={styles.inputs}>
                {inputValues.map((item, index) => (
                    <input
                        key={index}
                        // @ts-ignore
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        type="number"
                        placeholder={"0"}
                        pattern="/[0-9]/"
                        maxLength={1}
                        onChange={(event) => handleChange(event, index)}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                        onClick={() => {
                            inputRefs.current[index].value = ""
                            inputRefs.current[index].focus()
                            setInputValues((state) =>
                                state.map((item, ind) =>
                                    index === ind ? "" : item,
                                ),
                            )
                        }}
                    />
                ))}
            </div>
            {isMobile ? (
                <ButtonFill
                    label="Вставить"
                    classNames="w-100"
                    type="primary"
                    handleClick={clip}
                />
            ) : null}
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
                label="Подтвердить код"
                classNames="w-100"
                type="primary"
                submit="submit"
                handleClick={onInputValues}
            />
        </div>
    )
}
