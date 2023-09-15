import Image from "next/image"

import type { TButtonsCircle } from "./types/types"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const ButtonsCircle: TButtonsCircle = ({ src, type, onClick }) => {

  return (
    <div className={cx(styles.buttonCircle, styles[type])} onClick={() => { if (onClick) onClick() }}>
      <Image
        key={src}
        src={src}
        alt={src}
        width={20}
        height={20}
      />
    </div>
  )
}