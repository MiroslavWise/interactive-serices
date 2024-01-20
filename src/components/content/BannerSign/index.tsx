"use client"

import { isMobile } from "react-device-detect"

import { BannerIsAuth } from "./components/BannerIsAuth"

import { useAuth } from "@/store/hooks"

export function BannerSign() {
    const isAuth = useAuth(({ isAuth }) => isAuth)

    if (typeof isAuth === "undefined") return null
    if (isMobile) return null

    return isAuth ? <BannerIsAuth /> : null
}
