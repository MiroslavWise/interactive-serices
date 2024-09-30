"use client"

import dynamic from "next/dynamic"
import { type ReactNode, useEffect } from "react"

import Containers from "@/context/Containers"
import { WebSocketProvider, NextThemesProvider, QueryClientProviderContext } from "@/context"

import { useResize } from "@/helpers"
import { dispatchCookiesVisible, dispatchRefresh, useAdvertisingBanner, useCookies } from "@/store"
import { Wait } from "@/lib/ex-ids"

const YMapsProvider = dynamic(() => import("@/context/YMapsProvider"), {
  ssr: false,
})

export default ({ children }: { children: ReactNode }) => {
  const visibleAdvertisingBanner = useAdvertisingBanner(({ visible }) => visible)
  const isUse = useCookies(({ isUse }) => isUse)
  const { isMobile, isTablet } = useResize()

  useEffect(() => {
    document.documentElement.dataset.headerIsBanner = `${visibleAdvertisingBanner}`
  }, [visibleAdvertisingBanner])

  useEffect(() => {
    if (!isUse && typeof isUse !== "undefined") {
      dispatchCookiesVisible(true)
    }
  }, [isUse])

  useEffect(() => {
    dispatchRefresh()
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
    document.documentElement.style.height = window.innerHeight.toString() + "px"
    Wait()
  }, [])

  useEffect(() => {
    document.documentElement.dataset.mobile = `${isMobile}`
  }, [isMobile])
  useEffect(() => {
    document.documentElement.dataset.tablet = `${isTablet}`
  }, [isTablet])

  return (
    <YMapsProvider>
      <NextThemesProvider>
        <QueryClientProviderContext>
          <WebSocketProvider>
            {children}
            <Containers />
          </WebSocketProvider>
        </QueryClientProviderContext>
      </NextThemesProvider>
    </YMapsProvider>
  )
}
