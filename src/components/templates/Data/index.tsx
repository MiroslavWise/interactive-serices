import { ReactNode } from "react"

import NewServicesBanner from "../NewServicesBanner"
import CreateNewOptionModal from "../CreateNewOptionModal"
import CompletionTransaction from "../CompletionTransaction"
import ComplaintModal from "../ComplaintModal"
import UpdateProfile from "../UpdateProfile"
import ModalSign from "../ModalSign"
import BalloonAlert from "../Balloon/Alert"
import BalloonDiscussion from "../Balloon/Discussion"
import BalloonOffer from "../Balloon/Offer"
import ReciprocalExchange from "../ReciprocalExchange"
import OutAccount from "../OutAccount"
import DeleteOffer from "../DeleteOffer"
import DeleteUser from "../DeleteUser"
import UpdateOffer from "../UpdateOffer"
import ChangePassword from "../ChangePassword"
import ActiveServicesFrom from "../ActiveServicesFrom"
import SuccessNewOptional from "../SuccessNewOptional"

import { cx } from "@/lib/cx"
import { EModalData } from "@/store"

import { CN_CONTAINER_MODAL_SIGN } from "../ModalSign/style"
import { CN_SECTION } from "@/components/templates/NewServicesBanner/style"
import styleCreateNewOptionModal from "@/components/templates/CreateNewOptionModal/styles/style.module.scss"
import stylesCompletionTransaction from "@/components/templates/CompletionTransaction/styles/style.module.scss"
import stylesComplaintModal from "@/components/templates/ComplaintModal/styles/style.module.scss"
import stylesUpdateProfile from "@/components/templates/UpdateProfile/styles/style.module.scss"
import stylesGeneralOffer from "@/components/templates/Balloon/styles/general.module.scss"
import stylesOffer from "@/components/templates/Balloon/Offer/styles/style.module.scss"
import stylesAlertAndDiscussion from "@/components/templates/Balloon/Discussion/styles/style.module.scss"
import stylesReciprocalExchange from "@/components/templates/ReciprocalExchange/styles/style.module.scss"
import stylesOutAccount from "@/components/templates/OutAccount/style.module.scss"
import stylesUpdateOffer from "@/components/templates/UpdateOffer/style.module.scss"
import stylesChangePassword from "@/components/templates/ChangePassword/style.module.scss"
import stylesActiveServicesFrom from "@/components/templates/ActiveServicesFrom/styles/style.module.scss"
import stylesSuccessNewOptional from "@/components/templates/SuccessNewOptional/styles.module.scss"

const stringBalloonAlert = cx(stylesGeneralOffer.containerGeneral, stylesAlertAndDiscussion.container)
const stringBalloonDiscussion = cx(stylesGeneralOffer.containerGeneral, stylesAlertAndDiscussion.container)
const stringBalloonOffer = cx(stylesGeneralOffer.containerGeneral, stylesOffer.container)

export const DATA_MODAL: Map<EModalData, ReactNode> = new Map([
  [EModalData.NewServicesBanner, <NewServicesBanner key="::key::modal::new-services-banner" />], //Выбор трёх созданий: предложения, дискуссии и алерта
  [EModalData.NewServicesBannerMap, <NewServicesBanner key="::key::modal::new-services-banner" />], //Выбор трёх созданий: предложения, дискуссии и алерта
  [EModalData.CreateNewOptionModal, <CreateNewOptionModal key="::key::modal::create-new-option-modal" />], //Создание предложения, дискуссии и алерта
  [EModalData.CreateNewOptionModalMap, <CreateNewOptionModal key="::key::modal::create-new-option-modal" />], //Создание предложения, дискуссии и алерта
  [EModalData.CompletionTransaction, <CompletionTransaction key="::key::modal::completion-transaction" />], //Отзыв о завершении обмена
  [EModalData.ComplaintModal, <ComplaintModal key="::key::modal::complaint-modal" />], //Жалоба на пользователя
  [EModalData.UpdateProfile, <UpdateProfile key="::key::modal::update-profile" />], //Редактирование профиля
  [EModalData.ModalSign, <ModalSign key="::key::modal::modal-sign" />], //Флоу логина и регаистрации
  [EModalData.BalloonAlert, <BalloonAlert key="::key::modal::modal-sign" />], //Балун алерта
  [EModalData.BalloonDiscussion, <BalloonDiscussion key="::key::modal::modal-sign" />], //Балун дискуссии
  [EModalData.BalloonOffer, <BalloonOffer key="::key::modal::modal-sign" />], //балун оффера
  [EModalData.ReciprocalExchange, <ReciprocalExchange key="::key::modal::reciprocal-exchange" />], //Обмен предложениями
  [EModalData.OutAccount, <OutAccount key="::key::modal::out-account" />], //Выход с аккаунта
  [EModalData.UpdateOffer, <UpdateOffer key="::key::modal::out-account" />], //Изменение оффера
  [EModalData.ChangePassword, <ChangePassword key="::key::modal::change-password" />], //Изменение пароля
  [EModalData.DeleteOffer, <DeleteOffer key="::key::modal::delete-offer" />], //Удаление оффера
  [EModalData.DeleteUser, <DeleteUser key="::key::modal::delete-user" />], //Удаление оффера
  [EModalData.ActiveServicesFrom, <ActiveServicesFrom key="::key::modal::active-services-from" />], //Желаемые услуги
  [EModalData.SuccessNewOptional, <SuccessNewOptional key="::key::modal::successNewOptional" />], //Успешное создание оффера, дискуссии или алерта
])
export const STYLE_MODAL: Map<EModalData, string> = new Map([
  [EModalData.NewServicesBanner, CN_SECTION],
  [EModalData.NewServicesBannerMap, CN_SECTION],
  [EModalData.CreateNewOptionModal, styleCreateNewOptionModal.container],
  [EModalData.CreateNewOptionModalMap, styleCreateNewOptionModal.container],
  [EModalData.CompletionTransaction, stylesCompletionTransaction.container],
  [EModalData.ComplaintModal, stylesComplaintModal.container],
  [EModalData.UpdateProfile, stylesUpdateProfile.container],
  [EModalData.ModalSign, CN_CONTAINER_MODAL_SIGN],
  [EModalData.BalloonAlert, stringBalloonAlert],
  [EModalData.BalloonDiscussion, stringBalloonDiscussion],
  [EModalData.BalloonOffer, stringBalloonOffer],
  [EModalData.ReciprocalExchange, stylesReciprocalExchange.container],
  [EModalData.OutAccount, stylesOutAccount.container],
  [EModalData.DeleteOffer, stylesOutAccount.container],
  [EModalData.DeleteUser, stylesOutAccount.container],
  [EModalData.UpdateOffer, stylesUpdateOffer.container],
  [EModalData.ChangePassword, stylesChangePassword.container],
  [EModalData.ActiveServicesFrom, stylesActiveServicesFrom.container],
  [EModalData.SuccessNewOptional, stylesSuccessNewOptional.container],
])

export const ID_MODAL: Map<EModalData, string> = new Map([
  [EModalData.NewServicesBanner, "container-services-banner"],
  [EModalData.CreateNewOptionModal, "container-create-option-modal"],
])
