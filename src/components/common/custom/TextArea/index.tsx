"use client"

import type { TCustomTextArea } from "./types"

import styles from "./style.module.scss"

export const CustomTextArea: TCustomTextArea = ({
    value,
    setValue,
    placeholder,
}) => {
    return (
        <textarea
            className={styles.container}
            value={value}
            onChange={(value) => setValue(value.target.value)}
            placeholder={placeholder}
        />
    )
}
