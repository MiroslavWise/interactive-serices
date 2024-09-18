import { create } from "zustand"

import { type IUserResponse } from "@/services/users/types"
import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"

export const useDeleteFriend = create<IStateDeleteFriend>(() => ({}))

export const dispatchDeleteFriend = (value?: IUserResponse) => {
  if (value) {
    dispatchModal(EModalData.DELETE_FRIEND)
    useDeleteFriend.setState(
      (_) => ({
        user: value,
      }),
      true,
    )
  } else {
    dispatchModalClose()
    useDeleteFriend.setState(
      (_) => ({
        user: undefined,
      }),
      true,
    )
  }
}

interface IStateDeleteFriend {
  user?: IUserResponse
}
