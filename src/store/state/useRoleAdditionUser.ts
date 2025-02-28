import { create } from "zustand"

import { IUserResponse } from "@/services/users/types"
import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"

export const useRoleAdditionUser = create<IState>(() => ({}))

export const dispatchRoleAdditionUser = (value?: IUserResponse) => {
  if (value) {
    useRoleAdditionUser.setState((_) => ({ user: value }), true)
    dispatchModal(EModalData.ROLE_ADDITION)
  } else {
    useRoleAdditionUser.setState((_) => ({ user: undefined }), true)
    dispatchModalClose()
  }
}

interface IState {
  user?: IUserResponse
}
