import Image from "next/image"

import type { TButtonCircleGradient } from "./types"

import { cx } from "@/lib/cx"

import styles from "./styles/button.module.scss"

export const ButtonCircleGradient: TButtonCircleGradient = ({
  classNames, handleClick, disabled, type, icon,
}) => {

  return (
    <div
      className={cx(styles.circleGradient, styles[type], disabled && styles.disabled, classNames)}
      onClick={() => { handleClick ? handleClick() : null }}
    >
      <Image
        src={icon}
        alt="icon"
        width={40}
        height={40}
      />
    </div>
  )
}