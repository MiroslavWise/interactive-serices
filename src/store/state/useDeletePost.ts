import { create } from "zustand"
import { dispatchModal, EModalData } from "./useModal"

export const useDeletePost = create<IState>(() => ({}))

export const dispatchCloseDeletePost = () => useDeletePost.setState(() => ({ id: undefined, title: undefined }), true)
export const dispatchOpenDeletePost = (id: number, title: string) => {
  dispatchModal(EModalData.DELETE_POST)
  useDeletePost.setState(() => ({ id: id, title: title }), true)
}

interface IState {
  id?: number
  title?: string
}
