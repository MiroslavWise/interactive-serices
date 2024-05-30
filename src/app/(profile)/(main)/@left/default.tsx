"use client"

import LeftAsideProfile from "@/components/profile/LeftAsideProfile"

import { useResize } from "@/helpers"
import { useAdvertisingBanner } from "@/store"

export default function Default() {
  const { isTablet } = useResize()
  const visible = useAdvertisingBanner(({ visible }) => visible)

  return !isTablet ? <LeftAsideProfile isBanner={visible} /> : null
}
