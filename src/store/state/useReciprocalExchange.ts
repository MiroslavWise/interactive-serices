import { create } from "zustand"

import type { IActionReciprocalExchange, IStateReciprocalExchange } from "../types/createReciprocalExchange"
import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"

export const useReciprocalExchange = create<IStateReciprocalExchange>((set, get) => ({
  isCollapse: false,
}))

export const dispatchReciprocalExchange = (values: IActionReciprocalExchange) => {
  const { visible, ...rest } = values ?? {}

  if (visible) {
    dispatchModal(EModalData.ReciprocalExchange)
  } else {
    dispatchModalClose()
  }
  useReciprocalExchange.setState((_) => {
    return {
      ..._,
      ...rest,
    }
  })
}

export const dispatchReciprocalExchangeCollapse = (value: boolean) =>
  useReciprocalExchange.setState((_) => ({
    ..._,
    isCollapse: value,
  }))
