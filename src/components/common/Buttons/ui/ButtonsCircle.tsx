import Image from "next/image"

import type { TButtonsCircle } from "./types"

import { cx } from "@/lib/cx"

import styles from "./styles/button.module.scss"

export const ButtonsCircle: TButtonsCircle = ({ src, type }) => {

  return (
    <div className={cx(styles.buttonCircle, styles[type])}>
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