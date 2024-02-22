import { create } from "zustand"

import type { TUseComplaintModal, IAction } from "../types/createComplaintModal"

export const useComplaintModal = create<TUseComplaintModal>((set, get) => ({
  visibleComplaint: false,
}))

export const dispatchComplaintModal = (values: IAction) =>
  useComplaintModal.setState((_) => ({
    visibleComplaint: values.visible,
    user: values?.user,
  }))
