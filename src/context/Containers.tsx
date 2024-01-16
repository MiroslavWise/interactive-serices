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
    PhotoPreviewModal,
    HasClustererBalloons,
    CompletionTransaction,
    CreateNewOptionModal,
    DataConfirmationPopUp,
    NewServiceBarterRequests,
    MobileFiltersMap,
    Onboarding,
    ReciprocalExchange,
    BallonOffer,
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
    useAddCreateModal,
    useReciprocalExchange,
    useBallonOffer,
} from "@/store/hooks"

export const Containers = () => {
    const isAuth = useAuth(({ isAuth }) => isAuth)
    const isVisible = useAddCreateModal(({ isVisible }) => isVisible)
    const visiblePhotoOffer = usePhotoOffer(({ visible }) => visible)
    const visibleBallonOffer = useBallonOffer(({ visible }) => visible)
    const visibleNotifications = useVisibleNotifications(({ visible }) => visible)
    const visibleFriends = useDroverFriends(({ visibleFriends }) => visibleFriends)
    const visibleReciprocalExchange = useReciprocalExchange(({ visible }) => visible)
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
            {visibleBallonOffer && <BallonOffer />}
            {visiblePhotoOffer && <PhotoPreviewModal />}
            {visibleHasBalloon && <HasClustererBalloons />}
            {visibleDataConfirmation && <DataConfirmationPopUp />}
            {isAuth && (
                <>
                    <Barter />
                    <Onboarding />
                    <ComplaintModal />
                    <NewServicesBanner />
                    <CompletionTransaction />
                    <NewServiceBarterRequests />
                    {visibleFriends && <DroverFriends />}
                    {isMobile && <ExchangesModalMobile />}
                    {isVisible && <CreateNewOptionModal />}
                    {visibleUpdateMutual && <UpdateMutualOffer />}
                    {visibleReciprocalExchange && <ReciprocalExchange />}
                    {isMobile && visibleNotifications && <NotificationsMobile />}
                </>
            )}
        </>
    )
}
