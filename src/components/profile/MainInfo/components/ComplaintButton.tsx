"use client"

import type { IUserResponse } from "@/services/users/types"

import { dispatchComplaintModalUser, dispatchModal, EModalData } from "@/store"

export const ComplaintButton = (props: { user: IUserResponse }) => {
  const { user } = props ?? {}

  function handle() {
    if (user) {
      dispatchComplaintModalUser({
        user: user,
      })
      dispatchModal(EModalData.ComplaintModal)
      return
    }
  }

  return (
    <p data-complaint onClick={handle}>
      Пожаловаться
    </p>
  )
}
