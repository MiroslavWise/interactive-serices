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
    DataConfirmationPopUp,
} from "@/components/templates"
import { ExchangesModalMobile } from "@/components/profile"
import { FooterMenu, PhotoCarousel } from "@/components/layout"
import BalloonPlaceMark from "@/components/YandexMap/BalloonPlaceMark"

import {
    useAuth,
    useModalAuth,
    useTermsOfUse,
    useBalloonCard,
    useDroverFriends,
    useVisibleModalBarter,
    useVisibleNotifications,
    useUpdateMutualOffer,
    useDataConfirmationPopUp,
} from "@/store/hooks"

export const Containers = () => {
    const { token } = useAuth()
    const { visible } = useBalloonCard()
    const { isVisible } = useVisibleModalBarter()
    const { visibleFriends } = useDroverFriends()
    const { visible: visibleAuth } = useModalAuth()
    const { visiblePolicy, visibleRules } = useTermsOfUse()
    const { visibleUpdateMutual } = useUpdateMutualOffer()
    const { visible: visibleNotifications } = useVisibleNotifications()
    const { visibleDataConfirmation } = useDataConfirmationPopUp()

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
            {visibleDataConfirmation && <DataConfirmationPopUp />}
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
