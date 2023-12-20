"use client"

import { isMobile } from "react-device-detect"
import { ToastContainer } from "react-toastify"

import {
    Intro,
    Barter,
    ModalSign,
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
    MobileFiltersMap,
} from "@/components/templates"
import { ExchangesModalMobile } from "@/components/profile"
import { FooterMenu, PhotoCarousel } from "@/components/layout"
import { BalloonPlaceMark } from "@/components/YandexMap/BalloonPlaceMark"

import {
    useAuth,
    usePhotoOffer,
    useHasBalloons,
    useDroverFriends,
    useVisibleNotifications,
    useUpdateMutualOffer,
    useDataConfirmationPopUp,
} from "@/store/hooks"

export const Containers = () => {
    const isAuth = useAuth(({ isAuth }) => isAuth)
    const visiblePhotoOffer = usePhotoOffer(({ visible }) => visible)
    const visibleNotifications = useVisibleNotifications(({ visible }) => visible)
    const visibleFriends = useDroverFriends(({ visibleFriends }) => visibleFriends)
    const visibleHasBalloon = useHasBalloons(({ visibleHasBalloon }) => visibleHasBalloon)
    const visibleUpdateMutual = useUpdateMutualOffer(({ visibleUpdateMutual }) => visibleUpdateMutual)
    const visibleDataConfirmation = useDataConfirmationPopUp(({ visibleDataConfirmation }) => visibleDataConfirmation)

    return (
        <>
            <PhotoCarousel />
            <WelcomeModal />
            <BalloonPlaceMark />
            {isAuth === false && (
                <>
                    <Intro />
                    <ModalSign />
                    <AboutSheiraPopup />
                </>
            )}
            <ToastContainer limit={3} />
            {isMobile && (
                <>
                    <FooterMenu />
                    <MobileFiltersMap />
                </>
            )}
            {!isMobile && <PublicProfile />}
            {visiblePhotoOffer && <PhotoPreviewModal />}
            {visibleHasBalloon && <HasClustererBalloons />}
            {visibleDataConfirmation && <DataConfirmationPopUp />}
            {isAuth && (
                <>
                    <Barter />
                    <ComplaintModal />
                    <NewServicesBanner />
                    <ModalUpdateProfile />
                    <CompletionTransaction />
                    <ExchangesModalMobile />
                    <CreateNewOptionModal />
                    <NewServiceBarterRequests />
                    {isMobile && visibleNotifications && <NotificationsMobile />}
                    {visibleFriends && <DroverFriends />}
                    {visibleUpdateMutual && <UpdateMutualOffer />}
                </>
            )}
        </>
    )
}
