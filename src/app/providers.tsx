"use client"

import { isMobile } from "react-device-detect"
import { type ReactNode, useEffect } from "react"

import { AnimatedLoadPage } from "@/components/layout"
import { YMapsProvider, WebSocketProvider, NextThemesProvider, Containers, QueryClientProviderContext } from "@/context"

import "@/context/DayJSDefault"
import { useAuth, useFetchingSession, useOffersCategories } from "@/store/hooks"

export default function Providers({ children }: { children: ReactNode }) {
    const refresh = useAuth(({ refresh }) => refresh)
    const getCategories = useOffersCategories(({ getCategories }) => getCategories)
    const offersCategories = useFetchingSession(({ offersCategories }) => offersCategories)
    const getFetchingOffersCategories = useFetchingSession(({ getFetchingOffersCategories }) => getFetchingOffersCategories)

    useEffect(() => {
        refresh()
        window.addEventListener("load", () => {
            if ("serviceWorker" in navigator) {
                navigator.serviceWorker.register("/service-worker.js").then((response) => {
                    console.log("serviceWorker: ", response.scope)
                })
            }
        })
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty("--vh", `${vh}px`)
        document.documentElement.style.height = window.innerHeight.toString() + "px"
        if (typeof isMobile !== "undefined") {
            document.documentElement.dataset.mobile = `${isMobile}`
        }
    }, [])

    useEffect(() => {
        if (offersCategories === false) {
            getCategories().then((value) => {
                getFetchingOffersCategories(value)
            })
        }
    }, [offersCategories])

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
