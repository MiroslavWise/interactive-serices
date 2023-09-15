"use client"

import { isMobile } from "react-device-detect"

import type { TLabelInput } from "./types/types"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const LabelInput: TLabelInput = ({
    label, rules, placeholder, type, propsInput, errorMessage,
}) => {

    return (
        <section className={cx(styles.containerLabelInput, isMobile && styles.mobile)}>
            <label >{label} {rules ? <sup>*</sup> : null}</label>
            <div className={styles.groupInputAndError}>
                <input
                    type={type}
                    placeholder={placeholder}
                    className={cx(errorMessage && styles.errorInput)}
                    {...propsInput}
                />
                {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}
            </div>
        </section>
    )
}