"use client"

import type { IUserResponse } from "@/services/users/types"

import { dispatchComplaintModalUser } from "@/store"

export const ComplaintButton = (props: { user: IUserResponse }) => {
  const { user } = props ?? {}

  function handle() {
    if (user) {
      dispatchComplaintModalUser({
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
