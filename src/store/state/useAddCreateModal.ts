import { create } from "zustand"

import type { IUseAddCreateModal } from "../types/useAddCreateModal"
import type { IPostAddress } from "@/services/addresses/types/serviceAddresses"
import { TTypeProvider } from "@/services/file-upload/types"

export const useAddCreateModal = create<IUseAddCreateModal>((set, get) => ({
    isVisible: false,
    dispatchVisibleTypeCreateOptionals(props) {
        const { type, visible } = props ?? {}

        if (visible) {
            set({
                typeAdd: type,
                isVisible: visible,
            })
            return
        }

        if (!visible) {
            set({
                typeAdd: undefined,
                isVisible: false,
            })
            return
        }
    },
}))

export const openCreateOffers = (value: TTypeProvider) =>
    useAddCreateModal.setState(() => ({
        isVisible: true,
        typeAdd: value,
    }))

export const closeCreateOffers = () =>
    useAddCreateModal.setState(() => ({
        isVisible: false,
        addressInit: undefined,
    }))

export const dispatchAddressOffers = (value?: IPostAddress) =>
    useAddCreateModal.setState(() => ({
        addressInit: value,
    }))
