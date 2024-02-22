"use client"

import type { IUserResponse } from "@/services/users/types"

import { dispatchComplaintModal } from "@/store"

export const ComplaintButton = (props: { user: IUserResponse }) => {
    const { user } = props ?? {}

    function handle() {
        if (user) {
            dispatchComplaintModal({
                visible: true,
                user: user,
            })
            return
        }
    }

    return (
        <p data-complaint onClick={handle}> 
            Пожаловаться
        </p>
    )
}
