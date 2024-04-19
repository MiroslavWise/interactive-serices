"use client"

import { LeftAsideProfile } from "@/components/profile"

import { useResize } from "@/helpers"

export default function LeftDataProfile() {
  const { isTablet } = useResize()

  return !isTablet ? <LeftAsideProfile /> : null
}
