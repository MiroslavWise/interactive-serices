"use client"

import { isMobile } from "react-device-detect"
import { type ReactNode, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { AnimatedLoadPage } from "@/components/layout"
import { YMapsProvider, WebSocketProvider, NextThemesProvider, Containers, QueryClientProviderContext } from "@/context"

import { usePush } from "@/helpers"
import { useToast } from "@/helpers/hooks/useToast"
import { RegistrationService } from "@/services/auth/registrationService"
import {} from "@/context/QueryClientProviderContext"
import { useAuth, dispatchAuthModal, useFetchingSession, useOffersCategories } from "@/store/hooks"
import "@/context/DayJSDefault"

export default function Providers({ children }: { children: ReactNode }) {
    const refresh = useAuth(({ refresh }) => refresh)
    const searchParams = useSearchParams()
    const { handleReplace } = usePush()
    const { on } = useToast()
    const verifyToken = searchParams?.get("verify")
    const passwordResetToken = searchParams?.get("password-reset-token")
    const getCategories = useOffersCategories(({ getCategories }) => getCategories)

    const offersCategories = useFetchingSession(({ offersCategories }) => offersCategories)
    const getFetchingOffersCategories = useFetchingSession(({ getFetchingOffersCategories }) => getFetchingOffersCategories)

    useEffect(() => {
        window.addEventListener("load", () => {
            if ("serviceWorker" in navigator) {
                navigator.serviceWorker.register("/service-worker.js").then((response) => {
                    console.log("serviceWorker: ", response.scope)
                })
            }
        })
    }, [])

    useEffect(() => {
        refresh()
    }, [refresh])
    useEffect(() => {
        if (passwordResetToken) {
            handleReplace("/")
            dispatchAuthModal({
                visible: true,
                type: "ResetPassword",
            })
        }
    }, [passwordResetToken])
    useEffect(() => {
        if (verifyToken) {
            RegistrationService.verification({ code: verifyToken! }).then((response) => {
                if (response.ok) {
                    on({
                        message: "Ваш аккаунт успешно прошёл верификацию. Теперь вы можете войти на аккаунт.",
                    })
                    handleReplace("/")
                    dispatchAuthModal({
                        visible: true,
                        type: "SignIn",
                    })
                }
            })
        }
    }, [verifyToken])

    useEffect(() => {
        if (offersCategories === false) {
            getCategories().then((value) => {
                getFetchingOffersCategories(value)
            })
        }
    }, [offersCategories])

    useEffect(() => {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty("--vh", `${vh}px`)
        document.documentElement.style.height = window.innerHeight.toString() + "px"
    }, [])

    useEffect(() => {
        if (typeof isMobile !== "undefined") {
            document.documentElement.dataset.mobile = `${isMobile}`
        }
    }, [])

    return (
        <>
            <NextThemesProvider>
                <QueryClientProviderContext>
                    <WebSocketProvider>
                        <YMapsProvider>
                            {children}
                            <Containers />
                        </YMapsProvider>
                    </WebSocketProvider>
                </QueryClientProviderContext>
            </NextThemesProvider>
            <AnimatedLoadPage />
        </>
    )
}
