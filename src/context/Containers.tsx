"use client"

import dynamic from "next/dynamic"

import {
  Intro,
  WelcomeModal,
  AboutSheiraPopup,
  NotificationsMobile,
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
  useHasBalloons,
  useVisibleNotifications,
  useReasonBarters,
  useAddingPhoneNumber,
  useAddEmail,
  useCheckTheMail,
  useNumberConfirmation,
  useCreateNewCategory,
  useChangeService,
  useAuth,
} from "@/store"
import { useResize } from "@/helpers"
import Friends from "@/components/templates/Friends"
import MyFriends from "@/components/templates/MyFriends"

const Modal = dynamic(() => import("@/components/templates/Modal"), { ssr: false })
const CookiesToast = dynamic(() => import("@/components/templates/Cookies"), { ssr: false })
const PhotoCarousel = dynamic(() => import("@/components/layout/PhotoCarousel"), { ssr: false })
const PublicProfile = dynamic(() => import("@/components/templates/PublicProfile"), { ssr: false })
const CreateNewCategory = dynamic(() => import("@/components/templates/CreateNewCategory"), { ssr: false })
const DownloadApplication = dynamic(() => import("@/components/templates/DownloadApplication"), { ssr: false })
const ToastContainer = dynamic(() => import("react-toastify").then((res) => res.ToastContainer), { ssr: false })
const PreCloseCreateService = dynamic(() => import("@/components/templates/PreCloseCreateService"), { ssr: false })
const ChangeService = dynamic(() => import("@/components/profile").then((res) => res.ChangeService), { ssr: false })
const NotificationCreateService = dynamic(() => import("@/components/content/NotificationCreateService"), { ssr: false })

export const Containers = () => {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const visibleReasonBarters = useReasonBarters(({ visible }) => visible)
  const visibleNotifications = useVisibleNotifications(({ visible }) => visible)
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
      <DownloadApplication />
      <ToastContainer limit={1} />
      {isTablet && <MobileFiltersMap />}
      {visibleHasBalloon && <HasClustererBalloons />}
      {isAuth && (
        <>
          <MyFriends />
          <Onboarding />
          <PreCloseCreateService />
          <NotificationCreateService />
          {visibleChangeService && <ChangeService />}
          {visibleNumberConfirmation && <NumberConfirmation />}
          {visibleAddEmail && <AddEmail />}
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
