"use client"

import Image from "next/image"
import { isMobile } from "react-device-detect"

import { cx } from "@/lib/cx"
import { usePush } from "@/helpers/hooks/usePush"

import styles from "./styles/style.module.scss"

export const Logo = () => {
    const { handlePush } = usePush()
    return (
        <Image
            src="/logo/wordmark.svg"
            alt="logo"
            width={isMobile ? 107 : 117}
            height={isMobile ? 28 : 30}
            onClick={() => handlePush("/")}
            className={cx("cursor-pointer", isMobile && styles.isMobileLogo)}
        />
    )
}
