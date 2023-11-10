"use client"

import Image from "next/image"
import { isMobile } from "react-device-detect"

export const LogoSheira = () => (
    <Image
        src="/logo/wordmark.svg"
        alt="sheira"
        width={isMobile ? 119 : 140}
        height={isMobile ? 31 : 37}
    />
)
