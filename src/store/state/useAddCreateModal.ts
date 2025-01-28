import { create } from "zustand"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffers } from "@/services/offers/types"
import { type IUseAddCreateModal } from "../types/useAddCreateModal"
import { dispatchModal, EModalData } from "./useModal"

export const useAddCreateModal = create<IUseAddCreateModal>(() => ({}))

export const openCreateOffers = (value: EnumTypeProvider) =>
  useAddCreateModal.setState(() => ({
    typeAdd: value,
  }))

export const createCopyOffer = create<{ offer: IResponseOffers | null }>(() => ({
  offer: null,
}))

export const dispatchCopyOffer = (offer: IResponseOffers) => {
  createCopyOffer.setState(() => ({ offer }), true)
  useAddCreateModal.setState(() => ({ typeAdd: EnumTypeProvider.offer }), true)
  dispatchModal(EModalData.CreateNewOptionModalCopy)
}

export const closeCreateOffers = () =>
  useAddCreateModal.setState(() => ({
    addressInit: undefined,
  }))
