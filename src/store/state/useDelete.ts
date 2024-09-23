import { create } from "zustand"

import { type IUserOffer } from "@/services/offers/types"

import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"

export const useDeleteFriend = create<IStateDeleteFriend>(() => ({}))

export const dispatchDeleteFriend = (value?: IUserOffer) => {
  // if (value) {
  //   dispatchModal(EModalData.DELETE_FRIEND)
  //   useDeleteFriend.setState(
  //     (_) => ({
  //       user: value,
  //     }),
  //     true,
  //   )
  // } else {
  //   dispatchModalClose()
  //   useDeleteFriend.setState(
  //     (_) => ({
  //       user: undefined,
  //     }),
  //     true,
  //   )
  // }
}

interface IStateDeleteFriend {
  user?: IUserOffer
}
