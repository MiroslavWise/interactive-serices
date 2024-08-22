import { create } from "zustand"

import { EnumTypeProvider } from "@/types/enum"
import type { IUseAddCreateModal } from "../types/useAddCreateModal"

export const useAddCreateModal = create<IUseAddCreateModal>(() => ({}))

export const openCreateOffers = (value: EnumTypeProvider) =>
  useAddCreateModal.setState(() => ({
    typeAdd: value,
  }))

export const closeCreateOffers = () =>
  useAddCreateModal.setState(() => ({
    addressInit: undefined,
  }))
