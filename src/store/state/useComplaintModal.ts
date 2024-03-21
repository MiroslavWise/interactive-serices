import { create } from "zustand"

import type { TUseComplaintModal, IAction } from "../types/createComplaintModal"

export const useComplaintModal = create<TUseComplaintModal>((set, get) => ({
  visibleComplaint: false,
}))

export const dispatchComplaintModalUser = (values: IAction) =>
  useComplaintModal.setState((_) => ({
    visibleComplaint: values.visible,
    user: values?.user,
    offer: undefined,
  }))

export const dispatchComplaintModalOffer = (values: IAction) =>
  useComplaintModal.setState((_) => ({
    visibleComplaint: values.visible,
    offer: values?.offer,
    user: undefined,
  }))
