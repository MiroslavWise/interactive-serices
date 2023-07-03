import { TButtonCircleGradient } from "./types"


import styles from "./styles/button.module.scss"
import Image from "next/image"

export const ButtonCircleGradient: TButtonCircleGradient = ({
  classNames, handleClick, disabled, type, icon,
}) => {

  return (
    <div
      className={`${styles.circleGradient} ${styles[type]} ${disabled ? styles.disabled : ""} ${classNames ? classNames : ""}`}
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