import { create } from "zustand"

export const useModal = create<IStateUseModal>(() => ({
  visible: false,
  data: null,
}))

export const dispatchModal = (data: EModalData) => {
  console.log("dispatchModal: ", data)
  useModal.setState(
    (_) => ({
      visible: true,
      data: data,
    }),
    true,
  )
}

export const dispatchModalClose = () => {
  console.log(" --- dispatchModalClose --- ")
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
  ModalSign = "modal-sign",
  BalloonOffer = "balloon-offer",
  BalloonDiscussion = "balloon-discussion",
  BalloonAlert = "balloon-alert",
  ReciprocalExchange = "reciprocal-exchange",
  OutAccount = "out-account",
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
  SUCCESS_CREATE_POST = "success-create-post",
}

interface IStateUseModal {
  visible: boolean
  data: EModalData | null
}
