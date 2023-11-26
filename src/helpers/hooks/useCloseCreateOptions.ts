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
    const reset = useCreateOffer(({ reset }) => reset)
    const resetAlert = useCreateAlert(({ resetAlert }) => resetAlert)
    const resetRequest = useCreateRequest(({ resetRequest }) => resetRequest)
    const resetDiscussion = useCreateDiscussion(
        ({ resetDiscussion }) => resetDiscussion,
    )
    const typeAdd = useAddCreateModal(({ typeAdd }) => typeAdd)
    const dispatchVisibleTypeCreateOptionals = useAddCreateModal(
        ({ dispatchVisibleTypeCreateOptionals }) =>
            dispatchVisibleTypeCreateOptionals,
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
