"use client"

import { isMobile } from "react-device-detect"
import { ToastContainer } from "react-toastify"

import {
    Intro,
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
    usePhotoOffer,
    useTermsOfUse,
    useHasBalloons,
    useDroverFriends,
    useVisibleModalBarter,
    useVisibleNotifications,
    useUpdateMutualOffer,
    useDataConfirmationPopUp,
} from "@/store/hooks"

export const Containers = () => {
    const isAuth = useAuth(({ isAuth }) => isAuth)
    const visiblePhotoOffer = usePhotoOffer(({ visible }) => visible)
    const isVisible = useVisibleModalBarter(({ isVisible }) => isVisible)
    const visibleRules = useTermsOfUse(({ visibleRules }) => visibleRules)
    const visiblePolicy = useTermsOfUse(({ visiblePolicy }) => visiblePolicy)
    const visibleNotifications = useVisibleNotifications(({ visible }) => visible)
    const visibleFriends = useDroverFriends(({ visibleFriends }) => visibleFriends)
    const visibleHasBalloon = useHasBalloons(({ visibleHasBalloon }) => visibleHasBalloon)
    const visibleUpdateMutual = useUpdateMutualOffer(({ visibleUpdateMutual }) => visibleUpdateMutual)
    const visibleDataConfirmation = useDataConfirmationPopUp(({ visibleDataConfirmation }) => visibleDataConfirmation)

    return (
        <>
            <FooterMenu />
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
            {isVisible && <Barter />}
            <ToastContainer limit={3} />
            {!isMobile && <PublicProfile />}
            {visiblePhotoOffer && <PhotoPreviewModal />}
            {visibleHasBalloon && <HasClustererBalloons />}
            {visiblePolicy || visibleRules ? <TermsOfUse /> : null}
            {visibleDataConfirmation && <DataConfirmationPopUp />}
            {isAuth && (
                <>
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
