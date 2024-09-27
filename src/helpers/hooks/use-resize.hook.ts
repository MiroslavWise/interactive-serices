"use client"

import { useEffect, useState } from "react"

const SCREEN_MOBILE = 576
const SCREEN_TABLET = 768

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
