"use client"

import { useMemo } from "react"

import type { TButtonClose, IPositionAbsolute } from "./types/types"

import styles from "./styles/style.module.scss"
import Image from "next/image"

export const ButtonClose: TButtonClose = ({ onClick, position: { top, left, right, bottom } }) => {

  const position: IPositionAbsolute = useMemo(() => {
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
    <div
      className={styles.containerCloseButton}
      style={position}
      onClick={() => { if (onClick) onClick() }}
    >
      <Image
        src="/svg/x-close.svg"
        alt="x"
        width={20}
        height={20}
      />
    </div>
  )
}