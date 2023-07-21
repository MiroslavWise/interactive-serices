import Image from "next/image"

import type { TBadgeServices } from "./types"

import styles from "./style.module.scss"

export const BadgeServices: TBadgeServices = ({ photo, label }) => {

  return (
    <li className={styles.container}>
      <div className={styles.containerImgService}>
        <Image
          src={photo}
          alt="pl"
          width={16}
          height={16}
        />
      </div>
      <p>{label}</p>
    </li>
  )
}