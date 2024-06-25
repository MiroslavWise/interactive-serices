import { create } from "zustand"

import type { TUseComplaintModal, IAction } from "../types/createComplaintModal"

import { dispatchModal, EModalData } from "./useModal"
import { IResponseOffers } from "@/services/offers/types"

export const useComplaintModal = create<TUseComplaintModal>(() => ({}))

export const dispatchComplaintModalUser = (values: IAction) => {
  useComplaintModal.setState((_) => ({
    user: values?.user,
    offer: undefined,
  }))
  dispatchModal(EModalData.ComplaintModal)
}

export const dispatchComplaintModalOffer = ({ offer }: { offer: IResponseOffers }) => {
  console.log("dispatchComplaintModalOffer: ", dispatchComplaintModalOffer)
  useComplaintModal.setState((_) => ({
    offer: offer,
    user: undefined,
  }))
  dispatchModal(EModalData.ComplaintModal)
}
