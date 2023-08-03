"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { isMobile } from "react-device-detect"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const Logo = () => {
  const { push } = useRouter()
  return (
    <Image
      src="/logo/wordmark.svg"
      alt="logo"
      width={isMobile ? 107 : 117}
      height={isMobile ? 28 : 30}
      onClick={() => push("/")}
      className={cx("cursor-pointer", isMobile && styles.isMobileLogo)}
    />
  )
}