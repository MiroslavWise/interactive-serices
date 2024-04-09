"use client"

import dynamic from "next/dynamic"
import { ToastContainer } from "react-toastify"

import {
  Intro,
  PublicProfile,
  DroverFriends,
  WelcomeModal,
  AboutSheiraPopup,
  NotificationsMobile,
  PhotoPreviewModal,
  HasClustererBalloons,
  DataConfirmationPopUp,
  MobileFiltersMap,
  Onboarding,
  ReasonBarters,
  OptionProfileMobile,
  OutAccount,
  DeleteUser,
  ActiveServicesFrom,
  ChangePassword,
  AddingPhoneNumber,
  AddEmail,
  CheckTheMail,
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
  useReasonBarters,
  useActiveServicesFrom,
  useChangePassword,
  useAddingPhoneNumber,
  useAddEmail,
  useCheckTheMail,
  useNumberConfirmation,
  useUpdateOffer,
} from "@/store"
import { useResize } from "@/helpers"

const CookiesToast = dynamic(() => import("@/components/templates/Cookies"), { ssr: false })
const Modal = dynamic(() => import("@/components/templates/Modal"), { ssr: false })

export const Containers = () => {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const visiblePhotoOffer = usePhotoOffer(({ visible }) => visible)
  const visibleReasonBarters = useReasonBarters(({ visible }) => visible)
  const visibleNotifications = useVisibleNotifications(({ visible }) => visible)
  const visibleFriends = useDroverFriends(({ visibleFriends }) => visibleFriends)
  const visibleHasBalloon = useHasBalloons(({ visibleHasBalloon }) => visibleHasBalloon)
  const visibleDataConfirmation = useDataConfirmationPopUp(({ visibleDataConfirmation }) => visibleDataConfirmation)
  const visibleActiveService = useActiveServicesFrom(({ visible }) => visible)
  const visibleChangePassword = useChangePassword(({ visible }) => visible)
  const visibleAddingPhoneNumber = useAddingPhoneNumber(({ visible }) => visible)
  const visibleAddEmail = useAddEmail(({ visible }) => visible)
  const visibleCheckTheMail = useCheckTheMail(({ visible }) => visible)
  const visibleNumberConfirmation = useNumberConfirmation(({ visible }) => visible)
  const visibleUpdateOffer = useUpdateOffer(({ visible }) => visible)

  const { isTablet } = useResize()

  return (
    <>
      <Modal />
      <PhotoCarousel />
      <WelcomeModal />
      {isAuth === false && (
        <>
          <Intro />
          <AboutSheiraPopup />
        </>
      )}
      <ToastContainer limit={3} />
      <CookiesToast />
      {!isTablet && <PublicProfile />}
      {isTablet && <MobileFiltersMap />}
      {visiblePhotoOffer && <PhotoPreviewModal />}
      {visibleHasBalloon && <HasClustererBalloons />}
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
          {isTablet && <InitiatedBarterMobile />}
          {visibleReasonBarters && <ReasonBarters />}
          {visibleChangePassword && <ChangePassword />}
          {visibleActiveService && <ActiveServicesFrom />}
          {visibleCheckTheMail && <CheckTheMail />}
          {visibleAddingPhoneNumber && <AddingPhoneNumber />}
          {isTablet && visibleNotifications && <NotificationsMobile />}
        </>
      )}
    </>
  )
}
