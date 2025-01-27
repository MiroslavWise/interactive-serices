import { create } from "zustand"

export const useModal = create<IStateUseModal>(() => ({
  visible: false,
  data: null,
}))

export const dispatchModal = (data: EModalData) => {
  useModal.setState(
    (_) => ({
      visible: true,
      data: data,
    }),
    true,
  )
}

export const dispatchModalClose = () => {
  useModal.setState(
    (_) => ({
      visible: false,
      data: null,
    }),
    true,
  )
}

export enum EModalData {
  NewServicesBanner = "new-services-banner",
  NewServicesBannerMap = "new-services-banner-map",
  CreateNewOptionModal = "create-new-option-modal",
  CreateNewOptionModalMap = "create-new-option-modal-map",
  CompletionTransaction = "completion-transaction",
  ComplaintModal = "complaint-modal",
  UpdateProfile = "update-profile",
  BalloonOffer = "balloon-offer",
  BalloonDiscussion = "balloon-discussion",
  BalloonAlert = "balloon-alert",
  ReciprocalExchange = "reciprocal-exchange",
  /** Выход из аккаунта @default ВЫХОД */
  OutAccount = "out-account",
  /** Обновление умения или услуги @default ОБНОВЛЕНИЕ */
  UpdateOffer = "update-offer",
  ChangePassword = "change-password",
  DeleteOffer = "delete-offer",
  DeleteUser = "delete-user",
  ActiveServicesFrom = "active-services-from",
  SuccessNewOptional = "success-new-optional",
  UpdateDiscussionAndAlert = "update-discussion-and-alert",
  DeleteChat = "delete-chat",
  CancelExchange = "cancel-exchange",
  CREATE_POST = "create-post",
  CREATE_POST_MAP = "create-post-map",
  SUCCESS_CREATE_POST = "success-create-post",
  CREATE_NEW_NOTE = "create-new-note",
  BALLOON_POST = "balloon-post",
  DELETE_FRIEND = "delete-friend",
  DELETE_POST = "delete-post",
  SUCCESS_PROVIDE_FEEDBACK = "success-provide-feedback",
  UPDATE_ENABLED_COMPANY = "update-enabled-company",
  UPDATE_ENABLED_ACTIVE_COMPANY = "update-enabled-active-company",
  UPDATE_DELETE_COMPANY = "update-delete-company",
}

interface IStateUseModal {
  visible: boolean
  data: EModalData | null
}
