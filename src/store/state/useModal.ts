import { create } from "zustand"

export const useModal = create<IStateUseModal>(() => ({
  visible: false,
  data: null,
}))

export const dispatchModal = (data: EModalData) =>
  useModal.setState((_) => ({
    ..._,
    visible: true,
    data: data,
  }))

export const dispatchModalClose = () =>
  useModal.setState((_) => ({
    ..._,
    visible: false,
    data: null,
  }))

export enum EModalData {
  NewServicesBanner = "new-services-banner",
}

interface IStateUseModal {
  visible: boolean
  data: EModalData | null
}
