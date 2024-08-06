import { create } from "zustand"

import type { TUseComplaintModal, IAction } from "../types/createComplaintModal"

import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"
import { IResponseOffers } from "@/services/offers/types"

export const useComplaintModal = create<TUseComplaintModal>(() => ({}))

export const dispatchComplaintModalUser = (values: IAction) => {
  useComplaintModal.setState(
    (_) => ({
      user: values?.user,
      offer: undefined,
    }),
    true,
  )
  if (!!values?.user) {
    dispatchModal(EModalData.ComplaintModal)
  } else {
    dispatchModalClose()
  }
}

export const dispatchComplaintModalOffer = ({ offer }: { offer?: IResponseOffers }) => {
  useComplaintModal.setState(
    (_) => ({
      offer: offer,
      user: undefined,
    }),
    true,
  )
  if (!!offer) {
    dispatchModal(EModalData.ComplaintModal)
  } else {
    dispatchModalClose()
  }
}

export const dispatchCleanComplaintModal = () =>
  useComplaintModal.setState(
    () => ({
      offer: undefined,
      user: undefined,
    }),
    true,
  )
