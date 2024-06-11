"use client"

import type { IUserResponse } from "@/services/users/types"

import { dispatchComplaintModalUser, dispatchModal, EModalData } from "@/store"

export const ComplaintButton = (props: { user: IUserResponse }) => {
  const { user } = props ?? {}

  function handle() {
    if (user) {
      dispatchComplaintModalUser({
        user: {
          about: user?.profile?.about ?? "",
          birthdate: null,
          firstName: user?.profile?.firstName ?? "",
          lastName: user?.profile?.lastName ?? "",
          image: user?.profile?.image!,
          username: user?.profile?.username,
          id: user?.id!,
          gender: user?.profile?.gender!,
        },
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
