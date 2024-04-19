import Image from "next/image"

import type { TMobileOfferSegment } from "./types"

import styles from "./style.module.scss"

export const MobileOfferSegment: TMobileOfferSegment = ({ src, label, handleClick }) => {
  return (
    <li className={styles.container} onClick={handleClick}>
      <Image src={src} alt={src} width={60} height={60} unoptimized />
      <h3>{label}</h3>
    </li>
  )
}
