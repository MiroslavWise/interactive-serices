"use client"

import { forwardRef } from "react"
import { isMobile } from "react-device-detect"

import type { TTypeInput } from "../types/types"

import styles from "../styles/input.module.scss"

export const Input = forwardRef(function Input(props: TTypeInput) {
    const { label, error, rules, ...rest } = props ?? {}

    return (
        <div className={styles.container} data-mobile={isMobile}>
            {label ? (
                <label>
                    {label} {rules && <sup>*</sup>}
                </label>
            ) : null}
            <input {...rest} data-error={!!error} />
            {error ? <i>{error}</i> : null}
        </div>
    )
})
