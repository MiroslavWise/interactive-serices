"use client"

import dynamic from "next/dynamic"

import {
  Intro,
  PublicProfile,
  DroverFriends,
  WelcomeModal,
  AboutSheiraPopup,
  NotificationsMobile,
  PhotoPreviewModal,
  HasClustererBalloons,
  MobileFiltersMap,
  Onboarding,
  ReasonBarters,
  OptionProfileMobile,
  DeleteUser,
  ActiveServicesFrom,
  ChangePassword,
  AddingPhoneNumber,
  AddEmail,
  CheckTheMail,
  NumberConfirmation,
  InitiatedBarterMobile,
} from "@/components/templates"
import { ChangeService } from "@/components/profile"

import {
  useAuth,
  usePhotoOffer,
  useHasBalloons,
  useDroverFriends,
  useVisibleNotifications,
  useReasonBarters,
  useActiveServicesFrom,
  useChangePassword,
  useAddingPhoneNumber,
  useAddEmail,
  useCheckTheMail,
  useNumberConfirmation,
} from "@/store"
import { useResize } from "@/helpers"

const CookiesToast = dynamic(() => import("@/components/templates/Cookies"), { ssr: false })
const Modal = dynamic(() => import("@/components/templates/Modal"), { ssr: false })
const PhotoCarousel = dynamic(() => import("@/components/layout/PhotoCarousel"), { ssr: false })
const ToastContainer = dynamic(() => import("react-toastify").then((res) => res.ToastContainer), { ssr: false })

export const Containers = () => {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const visiblePhotoOffer = usePhotoOffer(({ visible }) => visible)
  const visibleReasonBarters = useReasonBarters(({ visible }) => visible)
  const visibleNotifications = useVisibleNotifications(({ visible }) => visible)
  const visibleFriends = useDroverFriends(({ visibleFriends }) => visibleFriends)
  const visibleHasBalloon = useHasBalloons(({ visibleHasBalloon }) => visibleHasBalloon)
  const visibleActiveService = useActiveServicesFrom(({ visible }) => visible)
  const visibleChangePassword = useChangePassword(({ visible }) => visible)
  const visibleAddingPhoneNumber = useAddingPhoneNumber(({ visible }) => visible)
  const visibleAddEmail = useAddEmail(({ visible }) => visible)
  const visibleCheckTheMail = useCheckTheMail(({ visible }) => visible)
  const visibleNumberConfirmation = useNumberConfirmation(({ visible }) => visible)

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
      {isAuth && (
        <>
          <Onboarding />
          <DeleteUser />
          <ChangeService />
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
