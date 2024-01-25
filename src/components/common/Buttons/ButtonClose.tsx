"use client"

import { CSSProperties, useMemo } from "react"

import type { TButtonClose, IPositionAbsolute } from "./types/types"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const ButtonClose: TButtonClose = ({ onClick, position: { top, left, right, bottom }, className }) => {
    const position: CSSProperties = useMemo(() => {
        const pos: IPositionAbsolute = {}
        if (top) {
            pos.top = top
        }
        if (left) {
            pos.left = left
        }
        if (right) {
            pos.right = right
        }
        if (bottom) {
            pos.bottom = bottom
        }
        return pos
    }, [top, left, right, bottom])

    return (
        <button
            type="button"
            className={cx(styles.containerCloseButton, className)}
            style={position}
            onClick={(event) => {
                event.stopPropagation()
                if (onClick) onClick(event)
            }}
            data-close
        >
            <div style={{ backgroundImage: `url(/svg/x-close.svg)` }} />
        </button>
    )
}
