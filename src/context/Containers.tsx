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
    const is = useAuth(({ isAuth }) => isAuth)
    const isVisible = useVisibleModalBarter(({ isVisible }) => isVisible)
    const { visibleFriends } = useDroverFriends((_) => ({
        visibleFriends: _.visibleFriends,
    }))
    const visibleHasBalloon = useHasBalloons(
        ({ visibleHasBalloon }) => visibleHasBalloon,
    )
    const visiblePolicy = useTermsOfUse(({ visiblePolicy }) => visiblePolicy)
    const visibleRules = useTermsOfUse(({ visibleRules }) => visibleRules)
    const visibleUpdateMutual = useUpdateMutualOffer(
        ({ visibleUpdateMutual }) => visibleUpdateMutual,
    )
    const visibleNotifications = useVisibleNotifications(
        ({ visible }) => visible,
    )
    const visibleDataConfirmation = useDataConfirmationPopUp(
        ({ visibleDataConfirmation }) => visibleDataConfirmation,
    )
    const visiblePhotoOffer = usePhotoOffer(({ visible }) => visible)

    return (
        <>
            <PublicProfile />
            <FooterMenu />
            <PhotoCarousel />
            <WelcomeModal />
            <BalloonPlaceMark />
            <AboutSheiraPopup />
            {isVisible && <Barter />}
            {!is && <ModalSign />}
            <ToastContainer limit={3} />
            {visiblePhotoOffer && <PhotoPreviewModal />}
            {visibleHasBalloon && <HasClustererBalloons />}
            {visiblePolicy || visibleRules ? <TermsOfUse /> : null}
            {visibleDataConfirmation && <DataConfirmationPopUp />}
            {is && (
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
