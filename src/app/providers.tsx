"use client"

import dynamic from "next/dynamic"
import { ToastContainer } from "react-toastify"
import { isMobile } from "react-device-detect"
import { type ReactNode, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import {
    PhotoCarousel,
    FooterMenu,
    AnimatedLoadPage,
    Glasses,
} from "@/components/layout"
import "@/context/DayJSDefault"
import {
    ModalUpdateProfile,
    WelcomeModal,
    Barter,
    CreateNewOptionModal,
    AboutSheiraPopup,
    NewServicesBanner,
    NewServiceBarterRequests,
    PublicProfile,
    NotificationsMobile,
    ComplaintModal,
    CompletionTransaction,
    DroverFriends,
    TermsOfUse,
} from "@/components/templates"
import { ExchangesModalMobile } from "@/components/profile"
import { SignPopup } from "@/components/auth/Signin/SignPopup"
import BalloonPlaceMark from "../components/YandexMap/BalloonPlaceMark"
import PhotoPreviewModal from "../components/templates/PhotoPreviewModal"
import { YMapsProvider, WebSocketProvider, NextThemesProvider } from "@/context"

import { usePush } from "@/helpers"
import { useAuth } from "@/store/hooks/useAuth"
import { useToast } from "@/helpers/hooks/useToast"
import {
    useVisibleAndTypeAuthModal,
    useVisibleModalBarter,
} from "@/store/hooks"
import { useDroverFriends } from "@/store/state/useDroverFriends"
import { useFetchingSession } from "@/store/state/useFetchingSession"
import { RegistrationService } from "@/services/auth/registrationService"
import { useOffersCategories } from "@/store/state/useOffersCategories"
import { useVisibleNotifications } from "@/store/state/useVisibleNotifications"
import { useTermsOfUse } from "@/store/state/useTermsOfUse"

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
    const { token, userId, refresh, isAuth } = useAuth()
    const searchParams = useSearchParams()
    const { handleReplace } = usePush()
    const { on } = useToast()
    const verifyToken = searchParams?.get("verify")
    const passwordResetToken = searchParams?.get("password-reset-token")
    const { setVisibleAndType } = useVisibleAndTypeAuthModal()
    const { getCategories } = useOffersCategories()
    const { visibleFriends } = useDroverFriends()
    const { isVisible } = useVisibleModalBarter()
    const { visible: visibleNotifications } = useVisibleNotifications()
    const { offersCategories, getFetchingOffersCategories } =
        useFetchingSession()
    const { visiblePolicy, visibleRules } = useTermsOfUse()

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
                        on(
                            "Ваш аккаунт успешно прошёл верификацию. Теперь вы можете войти на аккаунт.",
                        )
                        handleReplace("/")
                    }
                },
            )
        }
    }, [verifyToken, handleReplace, on])

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

    return (
        <>
            <NextThemesProvider>
                <QueryClientProvider client={queryClient}>
                    <WebSocketProvider>
                        <YMapsProvider>
                            {children}
                            {isMobile && token && visibleNotifications && (
                                <NotificationsMobile />
                            )}
                            <ToastContainer />
                            <FooterMenu />
                            <SignPopup />
                            <PhotoCarousel />
                            <WelcomeModal />
                            <ExchangesModalMobile />
                            {isVisible && <Barter />}
                            <CreateNewOptionModal />
                            <PhotoPreviewModal />
                            {token && userId ? <ModalUpdateProfile /> : null}
                            <AboutSheiraPopup />
                            <CompletionTransaction />
                            <BalloonPlaceMark />
                            {token && visibleFriends ? <DroverFriends /> : null}
                            <NewServicesBanner />
                            <NewServiceBarterRequests />
                            <PublicProfile />
                            {token && <ComplaintModal />}
                            {visiblePolicy || visibleRules ? (
                                <TermsOfUse />
                            ) : null}
                        </YMapsProvider>
                    </WebSocketProvider>
                </QueryClientProvider>
            </NextThemesProvider>
            <AnimatedLoadPage />
            <Glasses />
        </>
    )
}
