import { create } from "zustand"
import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"

export const usePost = create<{ visible: boolean }>(() => ({ visible: false }))

export const dispatchUsePost = (value: boolean) => {
  if (value) {
    dispatchModal(EModalData.CREATE_POST)
  } else {
    dispatchModalClose()
  }
}
