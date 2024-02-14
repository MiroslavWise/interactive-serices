"use client"

import { isMobile } from "react-device-detect"
import { ToastContainer } from "react-toastify"

import {
  Intro,
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
  BalloonOffer,
  BalloonDiscussion,
  ReasonBarters,
  OptionProfileMobile,
  OutAccount,
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
  useBalloonOffer,
  useBalloonDiscussion,
  useAddTestimonials,
  useReasonBarters,
  useComplaintModal,
} from "@/store/hooks"

export const Containers = () => {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const isVisible = useAddCreateModal(({ isVisible }) => isVisible)
  const visiblePhotoOffer = usePhotoOffer(({ visible }) => visible)
  const visibleBalloonOffer = useBalloonOffer(({ visible }) => visible)
  const visibleReasonBarters = useReasonBarters(({ visible }) => visible)
  const visibleTestimonials = useAddTestimonials(({ visible }) => visible)
  const visibleNotifications = useVisibleNotifications(({ visible }) => visible)
  const visibleBalloonDiscussion = useBalloonDiscussion(({ visible }) => visible)
  const visibleFriends = useDroverFriends(({ visibleFriends }) => visibleFriends)
  const visibleReciprocalExchange = useReciprocalExchange(({ visible }) => visible)
  const visibleHasBalloon = useHasBalloons(({ visibleHasBalloon }) => visibleHasBalloon)
  const visibleComplaint = useComplaintModal(({ visibleComplaint }) => visibleComplaint)
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
      {visibleBalloonOffer && <BalloonOffer />}
      {visiblePhotoOffer && <PhotoPreviewModal />}
      {visibleHasBalloon && <HasClustererBalloons />}
      {visibleBalloonDiscussion && <BalloonDiscussion />}
      {visibleDataConfirmation && <DataConfirmationPopUp />}
      {isAuth && (
        <>
          <Onboarding />
          <OutAccount />
          <NewServicesBanner />
          <NewServiceBarterRequests />
          {visibleFriends && <DroverFriends />}
          {isMobile && <ExchangesModalMobile />}
          {isMobile && <OptionProfileMobile />}
          {isVisible && <CreateNewOptionModal />}
          {visibleComplaint && <ComplaintModal />}
          {visibleReasonBarters && <ReasonBarters />}
          {visibleUpdateMutual && <UpdateMutualOffer />}
          {visibleTestimonials && <CompletionTransaction />}
          {visibleReciprocalExchange && <ReciprocalExchange />}
          {isMobile && visibleNotifications && <NotificationsMobile />}
        </>
      )}
    </>
  )
}
