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
    HasClustererBalloons,
    CompletionTransaction,
    CreateNewOptionModal,
    DataConfirmationPopUp,
    NewServiceBarterRequests,
} from "@/components/templates"
import { ExchangesModalMobile } from "@/components/profile"
import { FooterMenu, PhotoCarousel } from "@/components/layout"
import { BalloonPlaceMark } from "@/components/YandexMap/BalloonPlaceMark"

import {
    useAuth,
    useTermsOfUse,
    useBalloonCard,
    useHasBalloons,
    useDroverFriends,
    useVisibleModalBarter,
    useVisibleNotifications,
    useUpdateMutualOffer,
    useDataConfirmationPopUp,
} from "@/store/hooks"
import { usePhotoOffer } from "@/store/state/usePhotoOffer"

export const Containers = () => {
    const { token, isAuth } = useAuth()
    const { visible } = useBalloonCard()
    const { isVisible } = useVisibleModalBarter()
    const { visibleFriends } = useDroverFriends()
    const { visibleHasBalloon } = useHasBalloons()
    const { visiblePolicy, visibleRules } = useTermsOfUse()
    const { visibleUpdateMutual } = useUpdateMutualOffer()
    const { visible: visibleNotifications } = useVisibleNotifications()
    const { visibleDataConfirmation } = useDataConfirmationPopUp()
    const { visible: visiblePhotoOffer } = usePhotoOffer()

    return (
        <>
            <PublicProfile />
            <FooterMenu />
            <PhotoCarousel />
            <WelcomeModal />
            <BalloonPlaceMark />
            <AboutSheiraPopup />
            {isVisible && <Barter />}
            {!token && !isAuth && <ModalSign />}
            <ToastContainer limit={3} />
            {visiblePhotoOffer && <PhotoPreviewModal />}
            {visibleHasBalloon && <HasClustererBalloons />}
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
