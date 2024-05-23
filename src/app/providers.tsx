"use client"

import { type ReactNode, useEffect } from "react"

import { WebSocketProvider, NextThemesProvider, Containers, QueryClientProviderContext } from "@/context"

import { useResize } from "@/helpers"
import { dispatchCookiesVisible, useAdvertisingBanner, useAuth, useCookies, useFetchingSession, useOffersCategories } from "@/store"

export default ({ children }: { children: ReactNode }) => {
  const refresh = useAuth(({ refresh }) => refresh)
  const categories = useOffersCategories(({ categories }) => categories)
  const getCategories = useOffersCategories(({ getCategories }) => getCategories)
  const offersCategories = useFetchingSession(({ offersCategories }) => offersCategories)
  const getFetchingOffersCategories = useFetchingSession(({ getFetchingOffersCategories }) => getFetchingOffersCategories)
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
          {children}
          <Containers />
        </WebSocketProvider>
      </QueryClientProviderContext>
    </NextThemesProvider>
  )
}
