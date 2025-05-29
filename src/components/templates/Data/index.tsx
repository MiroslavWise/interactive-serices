import { type ReactNode } from "react"

import OutAccount from "../OutAccount"
import DeleteUser from "../DeleteUser"
import DeleteChat from "../DeleteChat"
import CreatePost from "../CreatePost"
import BallonPost from "../BallonPost"
import DeletePost from "../Delete/Post"
import DeleteOffer from "../DeleteOffer"
import UpdateOffer from "../Update/Offer"
import BalloonAlert from "../Balloon/Alert"
import DeleteFriend from "../Delete/Friend"
import BalloonOffer from "../Balloon/Offer"
import UpdateProfile from "../UpdateProfile"
import CreateNewNote from "../CreateNewNote"
import ComplaintModal from "../ComplaintModal"
import ChangePassword from "../ChangePassword"
import ProvideFeedback from "../ProvideFeedback"
import UpdateSuccess from "../Update/UpdateSuccess"
import NewServicesBanner from "../NewServicesBanner"
import SuccessCreatePost from "../SuccessCreatePost"
import BalloonDiscussion from "../Balloon/Discussion"
import SuccessNewOptional from "../SuccessNewOptional"
import CreateNewOptionModal from "../CreateNewOptionModal"
import SuccessProvideFeedback from "../SuccessProvideFeedback"
import UpdateCompanyDelete from "../Update/Company/UpdateCompanyDelete"
import UpdateCompanyEnabled from "../Update/Company/UpdateCompanyEnabled"

import { cx } from "@/lib/cx"
import { EModalData } from "@/store"

import { CN_SUCCESS_NEW_OPTIONAL } from "../SuccessNewOptional/style"
import { CN_SECTION } from "@/components/templates/NewServicesBanner/style"
import stylesOutAccount from "@/components/templates/OutAccount/style.module.scss"
import stylesCreatePost from "@/components/templates/CreatePost/style.module.scss"
import stylesBallonPost from "@/components/templates/BallonPost/style.module.scss"
import stylesUpdateOffer from "@/components/templates/Update/Offer/style.module.scss"
import stylesOffer from "@/components/templates/Balloon/Offer/styles/style.module.scss"
import stylesGeneralOffer from "@/components/templates/Balloon/styles/general.module.scss"
import stylesChangePassword from "@/components/templates/ChangePassword/style.module.scss"
import stylesUpdateProfile from "@/components/templates/UpdateProfile/styles/style.module.scss"
import stylesSuccessCreatePost from "@/components/templates/SuccessCreatePost/style.module.scss"
import stylesComplaintModal from "@/components/templates/ComplaintModal/styles/style.module.scss"
import UpdateDiscussionAndAlert, { CN_UPDATE_DISCUSSION_AND_ALERT } from "../Update/DiscussionAndAlert"
import stylesAlertAndDiscussion from "@/components/templates/Balloon/Discussion/styles/style.module.scss"
import styleCreateNewOptionModal from "@/components/templates/CreateNewOptionModal/styles/style.module.scss"
import RoleAddition from "../RoleAddition"
import DeleteUserManagement from "../DeleteUser/DeleteUserManagement"

const stringBalloonOffer = cx(stylesGeneralOffer.containerGeneral, stylesOffer.container)
const stringBalloonAlert = cx(stylesGeneralOffer.containerGeneral, stylesAlertAndDiscussion.container)
const stringBalloonDiscussion = cx(stylesGeneralOffer.containerGeneral, stylesAlertAndDiscussion.container)

export const DATA_MODAL: Map<EModalData, ReactNode> = new Map([
  [EModalData.NewServicesBanner, <NewServicesBanner key="::key::modal::new-services-banner" />], //Выбор трёх созданий: предложения, дискуссии и алерта
  [EModalData.NewServicesBannerMap, <NewServicesBanner key="::key::modal::new-services-banner" />], //Выбор трёх созданий: предложения, дискуссии и алерта
  [EModalData.CreateNewOptionModal, <CreateNewOptionModal key="::key::modal::create-new-option-modal" />], //Создание предложения и алерта
  [EModalData.CreateNewOptionModalMap, <CreateNewOptionModal key="::key::modal::create-new-option-modal" />], //Создание предложения и алерта
  [EModalData.CreateNewOptionModalCopy, <CreateNewOptionModal key="::key::CreateNewOptionModalCopy" />], //Копирование предложения и алерта
  // [EModalData.CompletionTransaction, <CompletionTransaction key="::key::modal::completion-transaction" />], //Отзыв о завершении обмена
  [EModalData.CompletionTransaction, <ProvideFeedback key="::key::modal::ProvideFeedback" />], //Отзыв о завершении обмена
  [EModalData.ComplaintModal, <ComplaintModal key="::key::modal::complaint-modal" />], //Жалоба на пользователя
  [EModalData.UpdateProfile, <UpdateProfile key="::key::modal::update-profile" />], //Редактирование профиля
  [EModalData.BalloonAlert, <BalloonAlert key="::key::modal::modal-sign" />], //Балун алерта
  [EModalData.BalloonDiscussion, <BalloonDiscussion key="::key::modal::modal-sign" />], //Балун дискуссии
  [EModalData.BalloonOffer, <BalloonOffer key="::key::modal::modal-sign" />], //балун оффера
  // [EModalData.ReciprocalExchange, <ReciprocalExchange key="::key::modal::reciprocal-exchange" />], //Обмен предложениями
  [EModalData.OutAccount, <OutAccount key="::key::modal::out-account" />], //Выход с аккаунта
  [EModalData.UpdateOffer, <UpdateOffer key="::key::modal::out-account" />], //Изменение оффера
  [EModalData.ChangePassword, <ChangePassword key="::key::modal::change-password" />], //Изменение пароля
  [EModalData.DeleteOffer, <DeleteOffer key="::key::modal::delete-offer" />], //Удаление оффера
  [EModalData.DeleteUser, <DeleteUser key="::key::modal::delete-user" />], //Удаление user
  [EModalData.DELETE_USER_MANAGEMENT, <DeleteUserManagement key="::key::modal::DeleteUserManagement" />], //Удаление user любого
  // [EModalData.ActiveServicesFrom, <ActiveServicesFrom key="::key::modal::active-services-from" />], //Желаемые услуги
  [EModalData.SuccessNewOptional, <SuccessNewOptional key="::key::modal::successNewOptional" />], //Успешное создание оффера, дискуссии или алерта
  [EModalData.UpdateDiscussionAndAlert, <UpdateDiscussionAndAlert key="::key::Update::Discussion::And::Alert" />], //Обновление беседы и алерта
  [EModalData.DeleteChat, <DeleteChat key="::key::DeleteChat" />], //Обновление чата
  // [EModalData.CancelExchange, <CancelExchange key="::key::CancelExchange" />], // Оклонение обмена
  [EModalData.CREATE_POST, <CreatePost key="::key::CreatePost" />], //Создание поста
  [EModalData.CREATE_POST_MAP, <CreatePost key="::key::CreatePost" />], //Создание поста
  [EModalData.CREATE_NEW_NOTE, <CreateNewNote key="::key::CreateNewNote" />], //Создание записи
  [EModalData.SUCCESS_CREATE_POST, <SuccessCreatePost key="::key::SuccessCreatePost" />], //Успех создания поста
  [EModalData.SUCCESS_PROVIDE_FEEDBACK, <SuccessProvideFeedback key="::key::SuccessProvideFeedback" />], //Успех создания отзыва
  [EModalData.BALLOON_POST, <BallonPost key="::key::BallonPost" />], //Балун поста
  [EModalData.DELETE_FRIEND, <DeleteFriend key="::key::DeleteFriend" />], //Удаление друга
  [EModalData.DELETE_POST, <DeletePost key="::key::DeleteFriend" />], //Удаление друга
  [EModalData.ROLE_ADDITION, <RoleAddition key="::key::RoleAddition::" />], //Добавление и обновление роли

  [EModalData.UPDATE_DELETE_COMPANY, <UpdateCompanyDelete key="::key::UpdateCompanyDelete::" />], //Удаление компании
  [EModalData.UPDATE_ENABLED_COMPANY, <UpdateCompanyEnabled key="::key::UpdateCompanyEnabled::" />], //Деактивация компании
  [EModalData.UPDATE_ENABLED_ACTIVE_COMPANY, <UpdateCompanyEnabled key="::key::UpdateCompanyEnabled::" />], //Активация компании

  [EModalData.SUCCESS_UPDATE_OFFER, <UpdateSuccess key="::key::UpdateSuccess-offer::" />], //Успешное обновление умения
  [EModalData.SUCCESS_UPDATE_ALERT, <UpdateSuccess key="::key::UpdateSuccess-alert::" />], //Успешное обновление SOS-сообщения
  [EModalData.SUCCESS_UPDATE_POSTS, <UpdateSuccess key="::key::UpdateSuccess-posts::" />], //Успешное обновление события
])
export const STYLE_MODAL: Map<EModalData, string> = new Map([
  [EModalData.NewServicesBanner, CN_SECTION], //
  [EModalData.NewServicesBannerMap, CN_SECTION], //
  [EModalData.CreateNewOptionModal, styleCreateNewOptionModal.container], //
  [EModalData.CreateNewOptionModalMap, styleCreateNewOptionModal.container], //
  [EModalData.CreateNewOptionModalCopy, styleCreateNewOptionModal.container], //
  // [EModalData.CompletionTransaction, CN_ProvideFeedback!], //
  [EModalData.ComplaintModal, stylesComplaintModal.container], //
  [EModalData.UpdateProfile, stylesUpdateProfile.container], //
  [EModalData.BalloonAlert, stringBalloonAlert], //
  [EModalData.BalloonDiscussion, stringBalloonDiscussion], //
  [EModalData.BalloonOffer, stringBalloonOffer], //
  // [EModalData.ReciprocalExchange, stylesReciprocalExchange.container], //
  [EModalData.OutAccount, stylesOutAccount.container], //
  [EModalData.DeleteOffer, stylesOutAccount.container], //
  [EModalData.DeleteUser, stylesOutAccount.container], //
  [EModalData.DeleteChat, stylesOutAccount.container], //
  [EModalData.DELETE_FRIEND, stylesOutAccount.container], //
  [EModalData.DELETE_POST, stylesOutAccount.container], //
  [EModalData.UPDATE_DELETE_COMPANY, stylesOutAccount.container], //
  [EModalData.DELETE_USER_MANAGEMENT, stylesOutAccount.container], //
  [EModalData.UPDATE_ENABLED_COMPANY, stylesOutAccount.container], //
  [EModalData.UPDATE_ENABLED_ACTIVE_COMPANY, stylesOutAccount.container], //
  [EModalData.ROLE_ADDITION, stylesOutAccount.container], //
  [EModalData.UpdateOffer, stylesUpdateOffer.container], //
  [EModalData.ChangePassword, stylesChangePassword.container], //
  // [EModalData.ActiveServicesFrom, stylesActiveServicesFrom.container], //
  [EModalData.SuccessNewOptional, CN_SUCCESS_NEW_OPTIONAL],
  [EModalData.SUCCESS_UPDATE_ALERT, CN_SUCCESS_NEW_OPTIONAL],
  [EModalData.SUCCESS_UPDATE_OFFER, CN_SUCCESS_NEW_OPTIONAL],
  [EModalData.SUCCESS_UPDATE_POSTS, CN_SUCCESS_NEW_OPTIONAL],
  [EModalData.UpdateDiscussionAndAlert, CN_UPDATE_DISCUSSION_AND_ALERT], //
  // [EModalData.CancelExchange, CN_CANCEL_EXCHANGE], //
  [EModalData.CREATE_POST, stylesCreatePost.container], //
  [EModalData.CREATE_POST_MAP, stylesCreatePost.container], //
  [EModalData.SUCCESS_CREATE_POST, stylesSuccessCreatePost.container], //
  [EModalData.SUCCESS_PROVIDE_FEEDBACK, stylesSuccessCreatePost.container], //
  [EModalData.CREATE_NEW_NOTE, stylesCreatePost.container], //
  [EModalData.BALLOON_POST, stylesBallonPost.container], //
])

export const ID_MODAL: Map<EModalData, string> = new Map([
  [EModalData.NewServicesBanner, "container-services-banner"],
  [EModalData.CreateNewOptionModal, "container-create-option-modal"],
])
