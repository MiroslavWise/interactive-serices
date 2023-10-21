import { type LegacyRef, forwardRef } from "react"

import type { TTypeTextArea } from "./types"

import styles from "./text-area.module.scss"

import { cx } from "@/lib/cx"

export const TextArea = forwardRef(function TextArea(
    props: TTypeTextArea,
    ref?: LegacyRef<HTMLTextAreaElement>,
) {
    return (
        <div
            className={cx(props.className, styles.labelContainer, props?.sup)}
            data-div-text-area
        >
            <textarea {...props} ref={ref} />
            <sup>
                {props.value?.toString().length || 0}/{props.maxLength || 240}
            </sup>
        </div>
    )
})
