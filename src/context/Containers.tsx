"use client"

import dynamic from "next/dynamic"

import {
  Intro,
  WelcomeModal,
  AboutSheiraPopup,
  NotificationsMobile,
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
  useVisibleNotifications,
  useReasonBarters,
  useAddingPhoneNumber,
  useAddEmail,
  useCheckTheMail,
  useNumberConfirmation,
  useCreateNewCategory,
  useChangeService,
  useDeleteNote,
  useArchivePost,
  useUpdatePost,
  useVideoModal,
  EStatusAuth,
} from "@/store"
import { useResize } from "@/helpers"
import Friends from "@/components/templates/Friends"
import MyFriends from "@/components/templates/MyFriends"
import ModalSign from "@/components/templates/ModalSign"
import { useStatusAuth } from "@/helpers/use-status-auth"
import UpdatePost from "@/components/templates/Update/Posts"
import ArchivePost from "@/components/templates/ArchivePost"

const Modal = dynamic(() => import("@/components/templates/Modal"), { ssr: false })
const VideoModal = dynamic(() => import("@/components/layout/VideoModal"), { ssr: false })
const CookiesToast = dynamic(() => import("@/components/templates/Cookies"), { ssr: false })
const DeleteNote = dynamic(() => import("@/components/templates/DeleteNote"), { ssr: false })
const PhotoCarousel = dynamic(() => import("@/components/layout/PhotoCarousel"), { ssr: false })
const PublicProfile = dynamic(() => import("@/components/templates/PublicProfile"), { ssr: false })
const CreateNewCategory = dynamic(() => import("@/components/templates/CreateNewCategory"), { ssr: false })
const DownloadApplication = dynamic(() => import("@/components/templates/DownloadApplication"), { ssr: false })
const ToastContainer = dynamic(() => import("react-toastify").then((res) => res.ToastContainer), { ssr: false })
const PreCloseCreateService = dynamic(() => import("@/components/templates/PreCloseCreateService"), { ssr: false })
const ChangeService = dynamic(() => import("@/components/profile").then((res) => res.ChangeService), { ssr: false })
const NotificationCreateService = dynamic(() => import("@/components/content/NotificationCreateService"), { ssr: false })

function Containers() {
  const statusAuth = useStatusAuth()
  const visibleReasonBarters = useReasonBarters(({ visible }) => visible)
  const visibleNotifications = useVisibleNotifications(({ visible }) => visible)
  const visibleAddingPhoneNumber = useAddingPhoneNumber(({ visible }) => visible)
  const visibleAddEmail = useAddEmail(({ visible }) => visible)
  const visibleCheckTheMail = useCheckTheMail(({ visible }) => visible)
  const visibleNumberConfirmation = useNumberConfirmation(({ visible }) => visible)
  const visibleCreateNewCategory = useCreateNewCategory(({ visible }) => visible)
  const visibleChangeService = useChangeService(({ visible }) => visible)
  const visibleDeleteNote = useDeleteNote(({ data }) => !!data)
  const visibleArchivePost = useArchivePost(({ data }) => !!data)
  const visibleUpdatePost = useUpdatePost(({ data }) => !!data)
  const visibleVideo = useVideoModal(({ visible }) => visible)

  const { isTablet } = useResize()

  return (
    <>
      <Modal />
      <WelcomeModal />
      <PhotoCarousel />
      <Intro />
      {visibleVideo && <VideoModal />}
      {statusAuth === EStatusAuth.UNAUTHORIZED && (
        <>
          <AboutSheiraPopup />
          <ModalSign />
        </>
      )}
      <Friends />
      <CookiesToast />
      <PublicProfile />
      <DownloadApplication />
      <ToastContainer limit={1} />
      {isTablet && <MobileFiltersMap />}
      {statusAuth === EStatusAuth.AUTHORIZED && (
        <>
          <MyFriends />
          <Onboarding />
          <PreCloseCreateService />
          <NotificationCreateService />
          {visibleDeleteNote && <DeleteNote />}
          {visibleUpdatePost && <UpdatePost />}
          {visibleArchivePost && <ArchivePost />}
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

Containers.displayName = "Containers"
export default Containers
