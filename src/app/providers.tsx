"use client"

import dynamic from "next/dynamic"
import { type ReactNode, useEffect } from "react"

import Containers from "@/context/Containers"
import { WebSocketProvider, NextThemesProvider, QueryClientProviderContext } from "@/context"

import { clg } from "@console"
import { Wait } from "@/lib/ex-ids"
import { dispatchCookiesVisible, dispatchRefresh, useCookies } from "@/store"

const YMapsProvider = dynamic(() => import("@/context/YMapsProvider"), {
  ssr: false,
})

export default ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    dispatchRefresh()
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
    document.documentElement.style.height = window.innerHeight.toString() + "px"
    Wait()
    requestAnimationFrame(() => {
      const is = useCookies.getState().isUse
      clg("dispatchCookiesVisible: ", is)
      if (typeof is !== "undefined" && !is) {
        dispatchCookiesVisible()
      }
    })
  }, [])

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
