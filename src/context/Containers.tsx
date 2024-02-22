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
  UpdateProfile,
  DeleteUser,
  ActiveServicesFrom,
  ChangePassword,
  AddingPhoneNumber,
  AddEmail,
  CheckTheMail,
  BalloonAlert,
  NumberConfirmation,
  UpdateOffer,
} from "@/components/templates"
import { ChangeService, ExchangesModalMobile } from "@/components/profile"
import { FooterMenu, PhotoCarousel } from "@/components/layout"

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
  useUpdateProfile,
  useActiveServicesFrom,
  useChangePassword,
  useAddingPhoneNumber,
  useAddEmail,
  useCheckTheMail,
  useBalloonAlert,
  useNumberConfirmation,
  useUpdateOffer,
} from "@/store"

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
  const visibleUpdateProfile = useUpdateProfile(({ visible }) => visible)
  const visibleDataConfirmation = useDataConfirmationPopUp(({ visibleDataConfirmation }) => visibleDataConfirmation)
  const visibleActiveService = useActiveServicesFrom(({ visible }) => visible)
  const visibleChangePassword = useChangePassword(({ visible }) => visible)
  const visibleAddingPhoneNumber = useAddingPhoneNumber(({ visible }) => visible)
  const visibleAddEmail = useAddEmail(({ visible }) => visible)
  const visibleCheckTheMail = useCheckTheMail(({ visible }) => visible)
  const visibleBalloonAlert = useBalloonAlert(({ visible }) => visible)
  const visibleNumberConfirmation = useNumberConfirmation(({ visible }) => visible)
  const visibleUpdateOffer = useUpdateOffer(({ visible }) => visible)

  return (
    <>
      <PhotoCarousel />
      <WelcomeModal />
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
      {visibleBalloonAlert && <BalloonAlert />}
      {visiblePhotoOffer && <PhotoPreviewModal />}
      {visibleHasBalloon && <HasClustererBalloons />}
      {visibleBalloonDiscussion && <BalloonDiscussion />}
      {visibleDataConfirmation && <DataConfirmationPopUp />}
      {isAuth && (
        <>
          <Onboarding />
          <OutAccount />
          <DeleteUser />
          <ChangeService />
          <NewServicesBanner />
          <NewServiceBarterRequests />
          {visibleUpdateOffer && <UpdateOffer />}
          {visibleNumberConfirmation && <NumberConfirmation />}
          {visibleAddEmail && <AddEmail />}
          {visibleFriends && <DroverFriends />}
          {isMobile && <ExchangesModalMobile />}
          {isMobile && <OptionProfileMobile />}
          {isVisible && <CreateNewOptionModal />}
          {visibleComplaint && <ComplaintModal />}
          {visibleReasonBarters && <ReasonBarters />}
          {visibleUpdateProfile && <UpdateProfile />}
          {visibleChangePassword && <ChangePassword />}
          {visibleActiveService && <ActiveServicesFrom />}
          {visibleCheckTheMail && <CheckTheMail />}
          {visibleTestimonials && <CompletionTransaction />}
          {visibleAddingPhoneNumber && <AddingPhoneNumber />}
          {visibleReciprocalExchange && <ReciprocalExchange />}
          {isMobile && visibleNotifications && <NotificationsMobile />}
        </>
      )}
    </>
  )
}
