"use client"

import { ToastContainer } from "react-toastify"
import { type ReactNode, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { QueryClient, QueryClientProvider } from "react-query"

import {
    ModalUpdateProfile,
    WelcomeModal,
    Barter,
    CreateNewOptionModal,
} from "@/components/templates"
import { ExchangesModalMobile } from "@/components/profile"
import {
    PhotoCarousel,
    FooterMenu,
    AnimatedLoadPage,
    Glasses,
} from "@/components/layout"
import { SignPopup } from "@/components/auth/Signin/SignPopup"
import { OnSuccessToastify } from "@/components/common/Toastify"

import { YMapsProvider, WebSocketProvider, NextThemesProvider } from "@/context"

import { useAuth } from "@/store/hooks/useAuth"
import { useMessages } from "@/store/state/useMessages"
import { useVisibleAndTypeAuthModal } from "@/store/hooks"
import { useFetchingSession } from "@/store/state/useFetchingSession"
import { RegistrationService } from "@/services/auth/registrationService"
import { useOffersCategories } from "@/store/state/useOffersCategories"

const queryClient = new QueryClient({})

export default function Providers({ children }: { children: ReactNode }) {
    const { changeAuth, token, userId } = useAuth()
    const searchParams = useSearchParams()
    const verifyToken = searchParams?.get("verify")
    const passwordResetToken = searchParams?.get("password-reset-token")
    const { setVisibleAndType } = useVisibleAndTypeAuthModal()
    const { resetMessages } = useMessages()
    const { getCategories } = useOffersCategories()
    const { offersCategories, getFetchingOffersCategories } =
        useFetchingSession()

    useEffect(() => {
        changeAuth()
    }, [changeAuth])
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
                        OnSuccessToastify(
                            "Ваш аккаунт успешно прошёл верификацию. Теперь вы можете войти на аккаунт.",
                        )
                    }
                },
            )
        }
    }, [verifyToken])

    useEffect(() => {
        if (typeof token === "undefined" && !token) {
            resetMessages()
        }
    }, [token, resetMessages])

    useEffect(() => {
        if (offersCategories === false) {
            getCategories().then((value) => {
                getFetchingOffersCategories(value)
            })
        }
    }, [getCategories, offersCategories, getFetchingOffersCategories])

    return (
        <>
            <NextThemesProvider>
                <QueryClientProvider client={queryClient}>
                    <WebSocketProvider>
                        <YMapsProvider>
                            {children}
                            <ToastContainer />
                            <FooterMenu />
                            <SignPopup />
                            <PhotoCarousel />
                            <WelcomeModal />
                            <ExchangesModalMobile />
                            <Barter />
                            <CreateNewOptionModal />
                            {token && userId ? <ModalUpdateProfile /> : null}
                        </YMapsProvider>
                    </WebSocketProvider>
                </QueryClientProvider>
            </NextThemesProvider>
            <AnimatedLoadPage />
            <Glasses />
        </>
    )
}
