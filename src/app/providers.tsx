"use client"

import dynamic from "next/dynamic"
import { ToastContainer } from "react-toastify"
import { type ReactNode, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { QueryClient, QueryClientProvider } from "react-query"

import "@/context/DayJSDefault"
import {
    ModalUpdateProfile,
    WelcomeModal,
    Barter,
    CreateNewOptionModal,
    AboutSheiraPopup,
} from "@/components/templates"
import { ExchangesModalMobile } from "@/components/profile"
import {
    PhotoCarousel,
    FooterMenu,
    AnimatedLoadPage,
    Glasses,
} from "@/components/layout"
import { SignPopup } from "@/components/auth/Signin/SignPopup"
const PhotoPreviewModal = dynamic(
    () => import("../components/templates/PhotoPreviewModal"),
    { ssr: false },
)
const BalloonPlaceMark = dynamic(
    () => import("../components/YandexMap/BalloonPlaceMark"),
    {
        ssr: false,
    },
)

import {
    YMapsProvider,
    WebSocketProvider,
    NextThemesProvider,
    ReduxProvider,
} from "@/context"
import { CompletionTransaction } from "@/components/templates/CompletionTransaction"

import { usePush } from "@/helpers"
import { useAuth } from "@/store/hooks/useAuth"
import { useToast } from "@/helpers/hooks/useToast"
import { useVisibleAndTypeAuthModal } from "@/store/hooks"
import { useFetchingSession } from "@/store/state/useFetchingSession"
import { RegistrationService } from "@/services/auth/registrationService"
import { useOffersCategories } from "@/store/state/useOffersCategories"
import { DroverFriends } from "@/components/templates/DroverFriends"
import { useDroverFriends } from "@/store/state/useDroverFriends"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchInterval: 30 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
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

    return (
        <>
            <NextThemesProvider>
                <QueryClientProvider client={queryClient}>
                    <ReduxProvider>
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
                                <PhotoPreviewModal />
                                {token && userId ? (
                                    <ModalUpdateProfile />
                                ) : null}
                                <AboutSheiraPopup />
                                <CompletionTransaction />
                                <BalloonPlaceMark />
                                {token && visibleFriends ? (
                                    <DroverFriends />
                                ) : null}
                            </YMapsProvider>
                        </WebSocketProvider>
                    </ReduxProvider>
                </QueryClientProvider>
            </NextThemesProvider>
            <AnimatedLoadPage />
            <Glasses />
        </>
    )
}
