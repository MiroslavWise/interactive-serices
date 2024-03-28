"use client"

import { LeftAsideProfile } from "@/components/profile"

import { useResize } from "@/helpers"

export default function Default() {
  const { isTablet } = useResize()

  return !isTablet ? <LeftAsideProfile /> : null
}
