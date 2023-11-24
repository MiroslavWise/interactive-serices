"use client"

import { type DispatchWithoutAction } from "react"

import type { TAddCreate } from "@/store/types/useAddCreateModal"

import {
    useCreateAlert,
    useCreateOffer,
    useCreateRequest,
    useCreateDiscussion,
    useAddCreateModal,
} from "@/store/hooks"

export const useCloseCreateOptions = () => {
    const { reset } = useCreateOffer((_) => ({ reset: _.reset }))
    const { resetAlert } = useCreateAlert((_) => ({ resetAlert: _.resetAlert }))
    const { resetRequest } = useCreateRequest((_) => ({
        resetRequest: _.resetRequest,
    }))
    const { resetDiscussion } = useCreateDiscussion((_) => ({
        resetDiscussion: _.resetDiscussion,
    }))
    const { dispatchVisibleTypeCreateOptionals, typeAdd } = useAddCreateModal(
        (_) => ({
            dispatchVisibleTypeCreateOptionals:
                _.dispatchVisibleTypeCreateOptionals,
            typeAdd: _.typeAdd,
        }),
    )

    function close() {
        dispatchVisibleTypeCreateOptionals()
        const obj: Record<TAddCreate, DispatchWithoutAction> = {
            offer: reset,
            request: resetRequest,
            discussion: resetDiscussion,
            alert: resetAlert,
        }
        if (typeAdd) obj[typeAdd!]()
    }

    return { close }
}
