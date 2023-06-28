import Image from "next/image"

import type { TButtonsCircle } from "./types"

import styles from "./button.module.scss"

export const ButtonsCircle: TButtonsCircle = ({ src, type }) => {

  return (
    <div className={`${styles.buttonCircle} ${styles[type]}`}>
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