"use client"

import { isMobile } from "react-device-detect"

import { useAuth } from "@/store/hooks"
import { LeftAsideProfile } from "@/components/profile"

export function BannerSign() {
  const isAuth = useAuth(({ isAuth }) => isAuth)

  if (typeof isAuth === "undefined") return null
  if (isMobile) return null

  return isAuth ? <LeftAsideProfile /> : null
}
