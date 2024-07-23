import { create } from "zustand"
import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"

export const useDeleteChat = create<IStateDeleteChat>(() => ({}))

export const dispatchOpenDeleteChat = (id: number | string) => {
  dispatchModal(EModalData.DeleteChat)
  useDeleteChat.setState(() => ({ id }), true)
}

export const dispatchCloseDeleteChat = () => {
  dispatchModalClose()
  useDeleteChat.setState(() => ({ id: undefined }), true)
}

interface IStateDeleteChat {
  id?: number | string
}
