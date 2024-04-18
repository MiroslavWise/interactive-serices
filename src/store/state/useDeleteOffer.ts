import { create } from "zustand"

import type { IStateDeleteOffer } from "../types/typeDeleteOffer"

import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"

export const useDeleteOffer = create<IStateDeleteOffer>(() => ({
  idOffer: null,
}))

export const dispatchDeleteOffer = ({ visible, idOffer }: IStateDeleteOffer & { visible: boolean }) => {
  if (visible) {
    dispatchModal(EModalData.DeleteOffer)
  } else {
    dispatchModalClose()
  }
  useDeleteOffer.setState(() => ({ idOffer }))
}
