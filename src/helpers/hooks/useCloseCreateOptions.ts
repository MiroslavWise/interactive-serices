import { type DispatchWithoutAction } from "react"

import type { TAddCreate } from "@/store/types/useAddCreateModal"

import { useCreateAlert } from "@/store/state/useCreateAlert"
import { useCreateOffer } from "@/store/state/useCreateOffer"
import { useCreateRequest } from "@/store/state/useCreateRequest"
import { useCreateDiscussion } from "@/store/state/useCreateDiscussion"
import { useAddCreateModal } from "@/store/state/useAddCreateModal"

export const useCloseCreateOptions = () => {
    const { reset } = useCreateOffer()
    const { resetAlert } = useCreateAlert()
    const { resetRequest } = useCreateRequest()
    const { resetDiscussion } = useCreateDiscussion()
    const { setVisibleAndType, typeAdd } = useAddCreateModal()

    function close() {
        setVisibleAndType()
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
