"use client"

import { type ReactNode, useEffect } from "react"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import Containers from "@/context/Containers"

import { clg } from "@console"
import { WebSocketProvider, QueryClientProviderContext } from "@/context"
import { dispatchCookiesVisible, dispatchRefresh, useCookies } from "@/store"

export default ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    dispatchRefresh()
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
    document.documentElement.style.height = window.innerHeight.toString() + "px"
    requestAnimationFrame(() => {
      const is = useCookies.getState().isUse
      clg("dispatchCookiesVisible: ", is)
      if (typeof is !== "undefined" && !is) {
        dispatchCookiesVisible()
      }
    })
  }, [])

  return (
    <NuqsAdapter>
      <QueryClientProviderContext>
        <WebSocketProvider>
          {children}
          <Containers />
        </WebSocketProvider>
      </QueryClientProviderContext>
    </NuqsAdapter>
  )
}
