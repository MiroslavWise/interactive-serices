"use client"

import { isMobile } from "react-device-detect"
import { ToastContainer } from "react-toastify"

import {
    Barter,
    TermsOfUse,
    PublicProfile,
    DroverFriends,
    WelcomeModal,
    ComplaintModal,
    AboutSheiraPopup,
    NewServicesBanner,
    NotificationsMobile,
    UpdateMutualOffer,
    ModalUpdateProfile,
    PhotoPreviewModal,
    CompletionTransaction,
    CreateNewOptionModal,
    NewServiceBarterRequests,
} from "@/components/templates"
import { ExchangesModalMobile } from "@/components/profile"
import { FooterMenu, PhotoCarousel } from "@/components/layout"
import { SignPopup } from "@/components/auth/Signin/SignPopup"
import BalloonPlaceMark from "@/components/YandexMap/BalloonPlaceMark"

import {
    useAuth,
    useTermsOfUse,
    useDroverFriends,
    useVisibleModalBarter,
    useVisibleNotifications,
    useUpdateMutualOffer,
} from "@/store/hooks"
import { useBalloonCard } from "@/store/state/useBalloonCard"

export const Containers = () => {
    const { token } = useAuth()
    const { isVisible } = useVisibleModalBarter()
    const { visible: visibleNotifications } = useVisibleNotifications()
    const { visibleFriends } = useDroverFriends()
    const { visiblePolicy, visibleRules } = useTermsOfUse()
    const { visibleUpdateMutual } = useUpdateMutualOffer()
    const { visible } = useBalloonCard()

    return (
        <>
            <SignPopup />
            <PublicProfile />
            <FooterMenu />
            <PhotoCarousel />
            <WelcomeModal />
            <AboutSheiraPopup />
            <PhotoPreviewModal />
            {isVisible && <Barter />}
            <ToastContainer limit={3} />
            {token && (
                <>
                    <ComplaintModal />
                    <NewServicesBanner />
                    <ModalUpdateProfile />
                    <CompletionTransaction />
                    <ExchangesModalMobile />
                    <CreateNewOptionModal />
                    <NewServiceBarterRequests />
                    {visible && <BalloonPlaceMark />}
                    {isMobile && visibleNotifications && (
                        <NotificationsMobile />
                    )}
                    {visibleFriends && <DroverFriends />}
                    {visibleUpdateMutual && <UpdateMutualOffer />}
                </>
            )}
            {visiblePolicy || visibleRules ? <TermsOfUse /> : null}
        </>
    )
}
