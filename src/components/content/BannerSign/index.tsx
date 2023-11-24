"use client"

import { memo } from "react"
import { isMobile } from "react-device-detect"

import { BannerIsAuth } from "./components/BannerIsAuth"
import { BannerIsNoAuth } from "./components/BannerIsNoAuth"

import { useAuth } from "@/store/hooks"

export const BannerSign = memo(function $BannerSign() {
    const { isAuth } = useAuth((_) => ({ isAuth: _.isAuth }))

    if (typeof isAuth === "undefined") return null
    if (isMobile) return null

    return isAuth ? <BannerIsAuth /> : <BannerIsNoAuth />
})
