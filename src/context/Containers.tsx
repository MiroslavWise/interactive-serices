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

export const Containers = () => {
    const { token } = useAuth()
    const { isVisible } = useVisibleModalBarter()
    const { visible: visibleNotifications } = useVisibleNotifications()
    const { visibleFriends } = useDroverFriends()
    const { visiblePolicy, visibleRules } = useTermsOfUse()
    const { visibleUpdateMutual } = useUpdateMutualOffer()

    return (
        <>
            <SignPopup />
            <PublicProfile />
            <FooterMenu />
            <PhotoCarousel />
            <WelcomeModal />
            <BalloonPlaceMark />
            <AboutSheiraPopup />
            <PhotoPreviewModal />
            {isVisible && <Barter />}
            <ExchangesModalMobile />
            <ToastContainer limit={3} />
            {token && (
                <>
                    <ComplaintModal />
                    <NewServicesBanner />
                    <ModalUpdateProfile />
                    <CompletionTransaction />
                    <CreateNewOptionModal />
                    <NewServiceBarterRequests />
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
