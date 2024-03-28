"use client"

import { useEffect, useState } from "react"

export const SCREEN_MOBILE = 576
export const SCREEN_TABLET = 768
export const SCREEN_LG = 992
export const SCREEN_XL = 1_200
export const SCREEN_XXL = 1_400

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth ?? 1280)

  useEffect(() => {
    const handleResize = (event: any) => {
      setWidth(event.target.innerWidth)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return {
    isMobile: width <= SCREEN_MOBILE,
    isTablet: width <= SCREEN_TABLET,
  }
}
