import { create } from "zustand"

import type { IDispatchCompletionTransaction, TUseCompletionTransaction } from "../types/createCompletionTransaction"

export const useCompletionTransaction = create<TUseCompletionTransaction>((set, get) => ({
    visible: false,

    dispatchCompletion({ visible, dataBarter, dataUser, cd, threadId }) {
        if (typeof threadId !== "undefined") {
            set({
                threadId: threadId,
            })
        }
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
                threadId: undefined,
            })
        }
    },
}))

export const dispatchCompletion = (values: IDispatchCompletionTransaction) =>
    useCompletionTransaction.setState((_) => {
        const cdRefresh = typeof values?.cd !== "undefined" ? values?.cd : () => {}

        if (values.visible && !!values.dataBarter && !!values.dataUser && typeof values.threadId !== "undefined") {
            return {
                visible: values.visible,
                dataBarter: values.dataBarter,
                dataUser: values.dataUser,
                threadId: values.threadId,
                cd: cdRefresh,
            }
        }
        return {
            visible: false,
            dataBarter: undefined,
            dataUser: undefined,
            threadId: undefined,
            cd: undefined,
        }
    })
