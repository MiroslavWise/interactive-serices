import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"

export const dispatchActiveServicesFrom = (value: boolean) => (value ? dispatchModal(EModalData.ActiveServicesFrom) : dispatchModalClose())
