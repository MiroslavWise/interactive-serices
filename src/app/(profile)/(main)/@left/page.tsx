"use client"

import { LeftAsideProfile } from "@/components/profile"

import { useResize } from "@/helpers"
import { useAdvertisingBanner } from "@/store"

export default function LeftDataProfile() {
  const { isTablet } = useResize()
  const visible = useAdvertisingBanner(({ visible }) => visible)

  return !isTablet ? <LeftAsideProfile isBanner={visible} /> : null
}
