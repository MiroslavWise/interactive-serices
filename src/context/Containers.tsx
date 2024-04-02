"use client"

import { ToastContainer } from "react-toastify"
import dynamic from "next/dynamic"

import {
  Intro,
  ModalSign,
  PublicProfile,
  DroverFriends,
  WelcomeModal,
  ComplaintModal,
  AboutSheiraPopup,
  NotificationsMobile,
  PhotoPreviewModal,
  HasClustererBalloons,
  CompletionTransaction,
  CreateNewOptionModal,
  DataConfirmationPopUp,
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
  InitiatedBarterMobile,
} from "@/components/templates"
import { PhotoCarousel } from "@/components/layout"
import { ChangeService } from "@/components/profile"

import {
  useAuth,
  usePhotoOffer,
  useHasBalloons,
  useDroverFriends,
  useVisibleNotifications,
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
import { useResize } from "@/helpers"
const CookiesToast = dynamic(() => import("@/components/templates/Cookies"), { ssr: false })
const Modal = dynamic(() => import("@/components/templates/Modal"), { ssr: false })

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

  const { isTablet } = useResize()

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
      <CookiesToast />
      <Modal />
      {!isTablet && <PublicProfile />}
      {isTablet && <MobileFiltersMap />}
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
          {visibleUpdateOffer && <UpdateOffer />}
          {visibleNumberConfirmation && <NumberConfirmation />}
          {visibleAddEmail && <AddEmail />}
          {visibleFriends && <DroverFriends />}
          {isTablet && <OptionProfileMobile />}
          {isVisible && <CreateNewOptionModal />}
          {isTablet && <InitiatedBarterMobile />}
          {visibleComplaint && <ComplaintModal />}
          {visibleReasonBarters && <ReasonBarters />}
          {visibleUpdateProfile && <UpdateProfile />}
          {visibleChangePassword && <ChangePassword />}
          {visibleActiveService && <ActiveServicesFrom />}
          {visibleCheckTheMail && <CheckTheMail />}
          {visibleTestimonials && <CompletionTransaction />}
          {visibleAddingPhoneNumber && <AddingPhoneNumber />}
          {visibleReciprocalExchange && <ReciprocalExchange />}
          {isTablet && visibleNotifications && <NotificationsMobile />}
        </>
      )}
    </>
  )
}
