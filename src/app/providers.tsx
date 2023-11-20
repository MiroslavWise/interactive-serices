"use client"

import { isMobile } from "react-device-detect"
import { type ReactNode, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import {
    YMapsProvider,
    WebSocketProvider,
    NextThemesProvider,
    Containers,
} from "@/context"
import "@/context/DayJSDefault"
import { AnimatedLoadPage, Glasses } from "@/components/layout"

import {
    useAuth,
    useModalAuth,
    useFetchingSession,
    useOffersCategories,
} from "@/store/hooks"
import { usePush } from "@/helpers"
import { useToast } from "@/helpers/hooks/useToast"
import { RegistrationService } from "@/services/auth/registrationService"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchInterval: 30 * 60 * 1000,
        },
    },
})

export default function Providers({ children }: { children: ReactNode }) {
    const { refresh } = useAuth()
    const searchParams = useSearchParams()
    const { handleReplace } = usePush()
    const { on } = useToast()
    const verifyToken = searchParams?.get("verify")
    const passwordResetToken = searchParams?.get("password-reset-token")
    const { dispatchAuthModal: setVisibleAndType } = useModalAuth()
    const { getCategories } = useOffersCategories()

    const { offersCategories, getFetchingOffersCategories } =
        useFetchingSession()

    useEffect(() => {
        refresh()
    }, [refresh])
    useEffect(() => {
        if (passwordResetToken) {
            setVisibleAndType({
                visible: true,
                type: "ResetPassword",
            })
        }
    }, [passwordResetToken, setVisibleAndType])
    useEffect(() => {
        if (verifyToken) {
            RegistrationService.verification({ code: verifyToken! }).then(
                (response) => {
                    if (response.ok) {
                        on({
                            message:
                                "Ваш аккаунт успешно прошёл верификацию. Теперь вы можете войти на аккаунт.",
                        })
                        handleReplace("/")
                        setVisibleAndType({
                            visible: true,
                            type: "SignIn",
                        })
                    }
                },
            )
        }
    }, [verifyToken, handleReplace, on, setVisibleAndType])

    useEffect(() => {
        if (offersCategories === false) {
            getCategories().then((value) => {
                getFetchingOffersCategories(value)
            })
        }
    }, [getCategories, offersCategories, getFetchingOffersCategories])

    useEffect(() => {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty("--vh", `${vh}px`)
        document.documentElement.style.height =
            window.innerHeight.toString() + "px"
    }, [])

    useEffect(() => {
        if (typeof isMobile !== "undefined") {
            document.documentElement.dataset.mobile = `${isMobile}`
        }
    }, [])

    return (
        <>
            <NextThemesProvider>
                <QueryClientProvider client={queryClient}>
                    <WebSocketProvider>
                        <YMapsProvider>
                            {children}
                            <Containers />
                        </YMapsProvider>
                    </WebSocketProvider>
                </QueryClientProvider>
            </NextThemesProvider>
            <AnimatedLoadPage />
            <Glasses />
        </>
    )
}
