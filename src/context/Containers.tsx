"use client"

import { isMobile } from "react-device-detect"
import { ToastContainer } from "react-toastify"

import {
    Barter,
    ModalSign,
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
import BalloonPlaceMark from "@/components/YandexMap/BalloonPlaceMark"

import {
    useAuth,
    useTermsOfUse,
    useBalloonCard,
    useDroverFriends,
    useVisibleModalBarter,
    useVisibleNotifications,
    useUpdateMutualOffer,
    useVisibleAndTypeAuthModal,
} from "@/store/hooks"

export const Containers = () => {
    const { token } = useAuth()
    const { visible } = useBalloonCard()
    const { isVisible } = useVisibleModalBarter()
    const { visibleFriends } = useDroverFriends()
    const { visiblePolicy, visibleRules } = useTermsOfUse()
    const { visibleUpdateMutual } = useUpdateMutualOffer()
    const { visible: visibleAuth } = useVisibleAndTypeAuthModal()
    const { visible: visibleNotifications } = useVisibleNotifications()

    return (
        <>
            <PublicProfile />
            <FooterMenu />
            <PhotoCarousel />
            <WelcomeModal />
            <AboutSheiraPopup />
            <PhotoPreviewModal />
            {isVisible && <Barter />}
            <ToastContainer limit={3} />
            {visible && <BalloonPlaceMark />}
            {visibleAuth && !token && <ModalSign />}
            {visiblePolicy || visibleRules ? <TermsOfUse /> : null}
            {token && (
                <>
                    <ComplaintModal />
                    <NewServicesBanner />
                    <ModalUpdateProfile />
                    <CompletionTransaction />
                    <ExchangesModalMobile />
                    <CreateNewOptionModal />
                    <NewServiceBarterRequests />
                    {isMobile && visibleNotifications && (
                        <NotificationsMobile />
                    )}
                    {visibleFriends && <DroverFriends />}
                    {visibleUpdateMutual && <UpdateMutualOffer />}
                </>
            )}
        </>
    )
}
