"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import type { TDots } from "./types"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const Dots: TDots = ({ id }) => {
  const { push } = useRouter()

  return (
    <div className={styles.dots}>
      <Image
        src="/svg/maximize.svg"
        alt="max"
        width={28}
        height={28}
        className={cx("cursor-pointer")}
        onClick={() => {
          push(`/user/${id}`)
        }}
      />
      <Image
        src="/svg/dots-vertical-gray.svg"
        alt="max"
        width={28}
        height={28}
      />
    </div>
  )
}