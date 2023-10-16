import { create } from "zustand"

import type { TUseCompletionTransaction } from "../types/createCompletionTransaction"

export const useCompletionTransaction = create<TUseCompletionTransaction>(
    (set, get) => ({
        visible: false,

        dispatchCompletion({ visible, dataBarter, dataUser, cd }) {
            if (visible && !!dataBarter && !!dataUser) {
                set({
                    visible,
                    dataBarter,
                    dataUser,
                })
                return
            }
            if (!visible) {
                set({
                    visible: false,
                    dataBarter: undefined,
                    dataUser: undefined,
                })
            }
        },
    }),
)
