"use client"

import { useMemo } from "react"

import type { TButtonClose, IPositionAbsolute } from "./types/types"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const ButtonClose: TButtonClose = ({ onClick, position: { top, left, right, bottom }, className }) => {
    const position: IPositionAbsolute = useMemo(() => {
        const pos: IPositionAbsolute = {
            top: 12,
        }
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
                if (onClick) onClick(event)
            }}
            data-close
        >
            <div style={{ backgroundImage: `url(/svg/x-close.svg)` }} />
        </button>
    )
}
