"use client"

import type { TLabelAndInput } from "./types/types"

import { TextArea } from "@/components/common/Inputs/components/TextArea"

import styles from "./styles/label-input.module.scss"

export const LabelAndInput: TLabelAndInput = ({
    title,
    placeholder,
    text,
    setText,
}) => {
    return (
        <div className={styles.container}>
            <p>{title}</p>
            <TextArea
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder={placeholder}
                maxLength={512}
            />
        </div>
    )
}
