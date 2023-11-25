"use client"

import { forwardRef, useState } from "react"
import { isMobile } from "react-device-detect"

import type { TTypeInput } from "../types/types"

import styles from "../styles/input.module.scss"
import Image from "next/image"

export const InputPassword = forwardRef(function Input(props: TTypeInput) {
    const { label, error, rules, ...rest } = props ?? {}
    const [state, setState] = useState(false)

    return (
        <div className={styles.container} data-mobile={isMobile} data-password>
            {label ? (
                <label>
                    {label} {rules && <sup>*</sup>}
                </label>
            ) : null}
            <div>
                <input
                    {...rest}
                    data-error={!!error}
                    type={state ? "text" : "password"}
                />
                <Image
                    onClick={() => setState((prev) => !prev)}
                    src={state ? "/svg/eye.svg" : "/svg/eye-off.svg"}
                    alt="eye"
                    width={20}
                    height={20}
                    data-eye
                    unoptimized
                />
            </div>
            {error ? <i>{error}</i> : null}
        </div>
    )
})
