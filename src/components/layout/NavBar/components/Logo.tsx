"use client"

import Link from "next/link"

import styles from "../styles/components.module.scss"

export const Logo = () => {
    return (
        <Link href={"/"} className={styles.logo}>
            <img src="/logo/wordmark.svg" alt="logo" width={117} height={30} />
        </Link>
    )
}
