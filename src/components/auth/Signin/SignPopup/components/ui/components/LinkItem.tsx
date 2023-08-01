"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

import type { TLinkItem } from "../types/types"

import styles from "../../styles/style.module.scss"

export const LinkItem: TLinkItem = ({ src, path }) => {
  const { push } = useRouter()

  return (
    <div className={styles.itemLink} onClick={() => push(path)}>
      <Image
        src={src}
        alt={src}
        height={24}
        width={24}
      />
    </div>
  )
}