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
  AddingPhoneNumber,
  AddEmail,
  CheckTheMail,
  NumberConfirmation,
  InitiatedBarterMobile,
} from "@/components/templates"

import {
  usePhotoOffer,
  useHasBalloons,
  useDroverFriends,
  useVisibleNotifications,
  useReasonBarters,
  useAddingPhoneNumber,
  useAddEmail,
  useCheckTheMail,
  useNumberConfirmation,
  useCreateNewCategory,
  useChangeService,
  useAdvertisingBanner,
  useAuth,
} from "@/store"
import { useResize } from "@/helpers"

const CookiesToast = dynamic(() => import("@/components/templates/Cookies"), { ssr: false })
const Modal = dynamic(() => import("@/components/templates/Modal"), { ssr: false })
const PhotoCarousel = dynamic(() => import("@/components/layout/PhotoCarousel"), { ssr: false })
const CreateNewCategory = dynamic(() => import("@/components/templates/CreateNewCategory"), { ssr: false })
const ToastContainer = dynamic(() => import("react-toastify").then((res) => res.ToastContainer), { ssr: false })
const ChangeService = dynamic(() => import("@/components/profile").then((res) => res.ChangeService), { ssr: false })
const HeaderBanner = dynamic(() => import("@/components/templates/HeaderBanner"), { ssr: false })

export const Containers = () => {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const visiblePhotoOffer = usePhotoOffer(({ visible }) => visible)
  const visibleReasonBarters = useReasonBarters(({ visible }) => visible)
  const visibleNotifications = useVisibleNotifications(({ visible }) => visible)
  const visibleFriends = useDroverFriends(({ visibleFriends }) => visibleFriends)
  const visibleHasBalloon = useHasBalloons(({ visibleHasBalloon }) => visibleHasBalloon)
  const visibleAddingPhoneNumber = useAddingPhoneNumber(({ visible }) => visible)
  const visibleAddEmail = useAddEmail(({ visible }) => visible)
  const visibleCheckTheMail = useCheckTheMail(({ visible }) => visible)
  const visibleNumberConfirmation = useNumberConfirmation(({ visible }) => visible)
  const visibleCreateNewCategory = useCreateNewCategory(({ visible }) => visible)
  const visibleChangeService = useChangeService(({ visible }) => visible)
  const visibleAdvertisingBanner = useAdvertisingBanner(({ visible }) => visible)

  const { isTablet } = useResize()

  return (
    <>
      <Modal />
      {visibleAdvertisingBanner && <HeaderBanner />}
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
          {visibleChangeService && <ChangeService />}
          {visibleNumberConfirmation && <NumberConfirmation />}
          {visibleAddEmail && <AddEmail />}
          {visibleFriends && <DroverFriends />}
          {isTablet && <OptionProfileMobile />}
          {isTablet && <InitiatedBarterMobile />}
          {visibleCheckTheMail && <CheckTheMail />}
          {visibleReasonBarters && <ReasonBarters />}
          {visibleCreateNewCategory && <CreateNewCategory />}
          {visibleAddingPhoneNumber && <AddingPhoneNumber />}
          {isTablet && visibleNotifications && <NotificationsMobile />}
        </>
      )}
    </>
  )
}
