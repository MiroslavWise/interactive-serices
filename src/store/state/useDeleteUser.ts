import { create } from "zustand"
import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"

export const useDeleteUser = create<IState>(() => ({}))

export const dispatchDeleteUser = (value?: number) => {
  if (typeof value === "number") {
    useDeleteUser.setState(() => ({ id: value }), true)
    dispatchModal(EModalData.DELETE_USER_MANAGEMENT)
  } else {
    useDeleteUser.setState(() => ({ id: undefined }), true)
    dispatchModalClose()
  }
}

interface IState {
  id?: number
}
