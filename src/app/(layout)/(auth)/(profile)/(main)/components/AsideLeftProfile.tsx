"use client"

import LeftAsideProfile from "@/components/profile/LeftAsideProfile"

import { useResize } from "@/helpers"

function AsideLeftProfile() {
  const { isTablet } = useResize()

  return !isTablet ? <LeftAsideProfile /> : null
}

AsideLeftProfile.displayName = "AsideLeftProfile"
export default AsideLeftProfile
