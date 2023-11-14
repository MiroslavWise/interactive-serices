import { create } from "zustand"
import type { TUseDataConfirmationPopUp } from "../types/createDataConfirmationPopUp"

export const useDataConfirmationPopUp = create<TUseDataConfirmationPopUp>(
    (set, get) => ({
        visibleDataConfirmation: false,

        dispatchDataConfirmation({ visible, type, nameFeedback }) {
            if (typeof type !== "undefined") {
                set({ type })
            } else {
                set({ type: undefined })
            }
            if (typeof nameFeedback !== "undefined") {
                set({ nameFeedback })
            } else {
                set({ nameFeedback: undefined })
            }
            set({ visibleDataConfirmation: visible })
        },
    }),
)
