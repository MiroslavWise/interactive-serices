import { dispatchModal, EModalData } from "./useModal"

export const dispatchChangePassword = (value: boolean) => {
  if (value) {
    dispatchModal(EModalData.ChangePassword)
  } else {
    dispatchModal(EModalData.UpdateProfile)
  }
}
