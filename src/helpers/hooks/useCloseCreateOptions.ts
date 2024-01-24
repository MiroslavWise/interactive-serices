"use client"

import { type DispatchWithoutAction } from "react"

import { useCreateAlert, useCreateOffer, useCreateRequest, useCreateDiscussion, useAddCreateModal, closeCreateOffers } from "@/store"

export const useCloseCreateOptions = () => {
    const reset = useCreateOffer(({ reset }) => reset)
    const resetAlert = useCreateAlert(({ resetAlert }) => resetAlert)
    const resetRequest = useCreateRequest(({ resetRequest }) => resetRequest)
    const resetDiscussion = useCreateDiscussion(({ resetDiscussion }) => resetDiscussion)
    const typeAdd = useAddCreateModal(({ typeAdd }) => typeAdd)

    function close() {
        closeCreateOffers()
        const obj: Record<string, DispatchWithoutAction> = {
            offer: reset,
            request: resetRequest,
            discussion: resetDiscussion,
            alert: resetAlert,
        }
        if (typeAdd) obj[typeAdd!]()
    }

    return { close }
}
