import Image from "next/image"
import type { TNewCreateBadge } from "../types/types"


import styles from "./styles/styles.module.scss"

export const NewCreateBadge: TNewCreateBadge = ({ value, imageSrc, label }) => {

  return (
    <li className={styles.containerLiNew}>
      <Image
        src={imageSrc}
        alt={imageSrc}
        width={36}
        height={36}
      />
      <p>{label}</p>
    </li>
  )
}