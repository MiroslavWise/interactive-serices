import { create } from "zustand"
import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"

export const useUpdateCompany = create<IState>(() => ({
  type: null,
  targetId: null,
}))

export const dispatchUpdateCompany = (type: T, targetId: number) => {
  useUpdateCompany.setState((_) => ({ type, targetId }), true)
  if (type === "delete") {
    dispatchModal(EModalData.UPDATE_DELETE_COMPANY)
  }
  if (type === "enabled") {
    dispatchModal(EModalData.UPDATE_ENABLED_COMPANY)
  }
  if (type === "active") {
    dispatchModal(EModalData.UPDATE_ENABLED_ACTIVE_COMPANY)
  }
}
export const dispatchUpdateCompanyClose = () => {
  dispatchModalClose()
  useUpdateCompany.setState(() => ({ type: null, targetId: null }), true)
}

type T = "enabled" | "delete" | "active"

interface IState {
  type: T | null
  targetId: number | null
}
