"use client"

import { isMobile, isTablet } from "react-device-detect"

import type { TSignBanner } from "./types"

import { BannerIsAuth } from "./components/BannerIsAuth"
import { BannerIsNoAuth } from "./components/BannerIsNoAuth"

import { useAuth } from "@/store/hooks"

export const SignBanner: TSignBanner = () => {
    const { isAuth } = useAuth()

    if (typeof isAuth === "undefined") return null

    return !isMobile || isTablet ? (
        isAuth ? (
            <BannerIsAuth />
        ) : (
            <BannerIsNoAuth />
        )
    ) : null
}
