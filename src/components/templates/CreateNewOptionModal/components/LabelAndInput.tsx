"use client"

import type { TLabelAndInput } from "./types/types"

import styles from "./styles/label-input.module.scss"
import { CustomTextArea } from "@/components/common/custom"

export const LabelAndInput: TLabelAndInput = ({
    title,
    placeholder,
    text,
    setText,
}) => {
    return (
        <div className={styles.container}>
            <p>{title}</p>
            <CustomTextArea
                value={text}
                setValue={setText}
                placeholder={placeholder}
            />
        </div>
    )
}
