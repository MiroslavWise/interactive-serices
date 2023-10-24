"use client"

import { useSearchParams } from "next/navigation"

import type { IUserResponse } from "@/services/users/types/usersService"

import { useComplaintModal } from "@/store/state/useComplaintModal"

export const ComplaintButton = (props: { user: IUserResponse }) => {
    const { user } = props ?? {}
    const { dispatchComplaintModal } = useComplaintModal()

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
