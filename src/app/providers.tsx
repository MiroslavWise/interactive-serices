"use client"

import { type ReactNode, useEffect } from "react"

import { AnimatedLoadPage } from "@/components/layout"
import { YMapsProvider, WebSocketProvider, NextThemesProvider, Containers, QueryClientProviderContext } from "@/context"

import { dispatchCookiesVisible, useAuth, useCookies, useFetchingSession, useOffersCategories } from "@/store"
import { useResize } from "@/helpers"

export default function Providers({ children }: { children: ReactNode }) {
  const refresh = useAuth(({ refresh }) => refresh)
  const categories = useOffersCategories(({ categories }) => categories)
  const getCategories = useOffersCategories(({ getCategories }) => getCategories)
  const offersCategories = useFetchingSession(({ offersCategories }) => offersCategories)
  const getFetchingOffersCategories = useFetchingSession(({ getFetchingOffersCategories }) => getFetchingOffersCategories)
  const isUse = useCookies(({ isUse }) => isUse)
  const visibleCookies = useCookies(({ visible }) => visible)

  const { isMobile, isTablet } = useResize()

  useEffect(() => {
    if (!isUse && !visibleCookies && typeof isUse !== "undefined") {
      dispatchCookiesVisible(true)
    }
  }, [isUse, visibleCookies])

  useEffect(() => {
    refresh()
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
    document.documentElement.style.height = window.innerHeight.toString() + "px"
  }, [])

  useEffect(() => {
    document.documentElement.dataset.mobile = `${isMobile}`
  }, [isMobile])
  useEffect(() => {
    document.documentElement.dataset.tablet = `${isTablet}`
  }, [isTablet])

  useEffect(() => {
    if (offersCategories === false) {
      getCategories().then((value) => {
        getFetchingOffersCategories(value)
      })
    }
  }, [offersCategories, categories])

  return (
    <NextThemesProvider>
      <QueryClientProviderContext>
        <WebSocketProvider>
          <YMapsProvider>
            {children}
            <Containers />
          </YMapsProvider>
        </WebSocketProvider>
      </QueryClientProviderContext>
      <AnimatedLoadPage />
    </NextThemesProvider>
  )
}
