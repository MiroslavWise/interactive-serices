"use client"

import Link from "next/link"
import Image from "next/image"
import { isMobile } from "react-device-detect"

import styles from "../styles/components.module.scss"

export const Logo = () => {
    return (
        <Link href={"/"} className={styles.logo}>
            <Image src="/logo/wordmark.svg" alt="logo" width={isMobile ? 107 : 117} height={isMobile ? 28 : 30} unoptimized />
        </Link>
    )
}
