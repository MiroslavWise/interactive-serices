import { create } from "zustand"

import { EnumTypeProvider } from "@/types/enum"
import type { IUseAddCreateModal } from "../types/useAddCreateModal"
import type { IPostAddress } from "@/services/addresses/types/serviceAddresses"

export const useAddCreateModal = create<IUseAddCreateModal>(() => ({}))

export const openCreateOffers = (value: EnumTypeProvider) =>
  useAddCreateModal.setState(() => ({
    typeAdd: value,
  }))

export const closeCreateOffers = () =>
  useAddCreateModal.setState(() => ({
    addressInit: undefined,
  }))

export const dispatchAddressOffers = (value?: IPostAddress) =>
  useAddCreateModal.setState(() => ({
    addressInit: value,
  }))
