"use client"

import dynamic from "next/dynamic"

import {
  Intro,
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
  // useAdvertisingBanner,
  useAuth,
} from "@/store"
import { useResize } from "@/helpers"
import Friends from "@/components/templates/Friends"

const CookiesToast = dynamic(() => import("@/components/templates/Cookies"), { ssr: false })
const Modal = dynamic(() => import("@/components/templates/Modal"), { ssr: false })
const PublicProfile = dynamic(() => import("@/components/templates/PublicProfile"), { ssr: false })
const PhotoCarousel = dynamic(() => import("@/components/layout/PhotoCarousel"), { ssr: false })
const CreateNewCategory = dynamic(() => import("@/components/templates/CreateNewCategory"), { ssr: false })
const ToastContainer = dynamic(() => import("react-toastify").then((res) => res.ToastContainer), { ssr: false })
const ChangeService = dynamic(() => import("@/components/profile").then((res) => res.ChangeService), { ssr: false })
const PreCloseCreateService = dynamic(() => import("@/components/templates/PreCloseCreateService"), { ssr: false })
const NotificationCreateService = dynamic(() => import("@/components/content/NotificationCreateService"), { ssr: false })

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
      <Friends />
      <CookiesToast />
      <PublicProfile />
      <ToastContainer limit={1} />
      {isTablet && <MobileFiltersMap />}
      {visiblePhotoOffer && <PhotoPreviewModal />}
      {visibleHasBalloon && <HasClustererBalloons />}
      {isAuth && (
        <>
          <NotificationCreateService />
          <Onboarding />
          <PreCloseCreateService />
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
