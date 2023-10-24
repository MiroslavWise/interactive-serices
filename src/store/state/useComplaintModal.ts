import { create } from "zustand"

import type { TUseComplaintModal } from "../types/createComplaintModal"

export const useComplaintModal = create<TUseComplaintModal>((set, get) => ({
    visibleComplaint: false,

    dispatchComplaintModal({ visible, user }) {
        if (typeof user !== "undefined") {
            set({ user: user })
        }
        if (visible) {
            set({ visibleComplaint: visible })
        } else {
            set({
                visibleComplaint: visible,
                user: undefined,
            })
        }
    },
}))
