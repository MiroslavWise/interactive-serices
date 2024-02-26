"use client"

import { CSSProperties, useMemo } from "react"

import type { TButtonClose, IPositionAbsolute } from "./types/types"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"
import { IconXClose } from "@/components/icons/IconXClose"

export const ButtonClose: TButtonClose = ({ onClick, position, className }) => {
  const positionCSS: CSSProperties = useMemo(() => {
    const pos: IPositionAbsolute = {}
    if (position?.top) {
      pos.top = position?.top
    }
    if (position?.left) {
      pos.left = position?.left
    }
    if (position?.right) {
      pos.right = position?.right
    }
    if (position?.bottom) {
      pos.bottom = position?.bottom
    }
    return pos
  }, [position])

  return (
    <button
      type="button"
      className={cx(styles.containerCloseButton, className)}
      style={positionCSS}
      onClick={(event) => {
        event.stopPropagation()
        if (onClick) onClick(event)
      }}
      data-close
    >
      <IconXClose />
    </button>
  )
}
