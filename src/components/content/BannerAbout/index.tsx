"use client"

import { BannerAboutMobile } from "./components/Mobile"
import { BannerAboutDesktop } from "./components/Desktop"

import { useResize } from "@/helpers"

export const BannerAbout = () => {
  const { isTablet } = useResize()

  return isTablet ? <BannerAboutMobile /> : <BannerAboutDesktop />
}
