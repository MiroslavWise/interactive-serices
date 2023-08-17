"use client"

import Image from "next/image"

import type { TButtonCircleGradientFill } from "./types/types"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const ButtonCircleGradientFill: TButtonCircleGradientFill = ({
  type, disabled, size, image, onClick,
}) => {

  return (
    <div
      className={cx(styles.buttonCircleGradientFill, styles[type], disabled && styles.disabled)}
      style={{
        width: size || 36,
        height: size || 36,
      }}
      onClick={onClick}
    >
      <Image
        src={image.src}
        alt="button-image"
        width={image?.size || image?.width}
        height={image?.size || image?.height}
      />
    </div>
  )
}