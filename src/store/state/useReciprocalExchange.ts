import { create } from "zustand"

import type { IActionReciprocalExchange, IStateReciprocalExchange } from "../types/createReciprocalExchange"

import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"

export const useReciprocalExchange = create<IStateReciprocalExchange>(() => ({
  isCollapse: false,
}))

export const dispatchReciprocalExchange = (values: IActionReciprocalExchange) => {
  const { visible, ...rest } = values ?? {}

  console.log("dispatchReciprocalExchange values: ", values)

  useReciprocalExchange.setState(
    (_) => ({
      ...rest,
    }),
    true,
  )

  if (visible) {
    dispatchModal(EModalData.ReciprocalExchange)
    console.log("dispatchReciprocalExchange visible: ", visible)
  } else {
    dispatchModalClose()
    console.log("dispatchReciprocalExchange visible: ", visible)
  }
}

export const dispatchReciprocalExchangeCollapse = (value: boolean) =>
  useReciprocalExchange.setState((_) => ({
    ..._,
    isCollapse: value,
  }))
