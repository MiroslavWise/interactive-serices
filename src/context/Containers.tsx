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
    const { isAuth } = useAuth((_) => ({ isAuth: _.isAuth }))
    const { isVisible } = useVisibleModalBarter((_) => ({
        isVisible: _.isVisible,
    }))
    const { visibleFriends } = useDroverFriends((_) => ({
        visibleFriends: _.visibleFriends,
    }))
    const { visibleHasBalloon } = useHasBalloons((_) => ({
        visibleHasBalloon: _.visibleHasBalloon,
    }))
    const { visiblePolicy, visibleRules } = useTermsOfUse((_) => ({
        visiblePolicy: _.visiblePolicy,
        visibleRules: _.visibleRules,
    }))
    const { visibleUpdateMutual } = useUpdateMutualOffer((_) => ({
        visibleUpdateMutual: _.visibleUpdateMutual,
    }))
    const { visibleNotifications } = useVisibleNotifications((_) => ({
        visibleNotifications: _.visible,
    }))
    const { visibleDataConfirmation } = useDataConfirmationPopUp((_) => ({
        visibleDataConfirmation: _.visibleDataConfirmation,
    }))
    const { visiblePhotoOffer } = usePhotoOffer((_) => ({
        visiblePhotoOffer: _.visible,
    }))

    return (
        <>
            <PublicProfile />
            <FooterMenu />
            <PhotoCarousel />
            <WelcomeModal />
            <BalloonPlaceMark />
            <AboutSheiraPopup />
            {isVisible && <Barter />}
            {!isAuth && !isAuth && <ModalSign />}
            <ToastContainer limit={3} />
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
