import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { IDispatchBallonOffer, IStateBallonOffer } from "../types/createBallonOffer"
import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"

export const useBalloonOffer = create(
  persist<IStateBallonOffer>((set, get) => ({}), {
    name: "ballon-offer",
    storage: createJSONStorage(() => sessionStorage),
  }),
)
export const useBalloonDiscussion = create(
  persist<IStateBallonOffer>((set, get) => ({}), {
    name: "ballon-discussion",
    storage: createJSONStorage(() => sessionStorage),
  }),
)

export const useBalloonAlert = create(
  persist<IStateBallonOffer>((set, get) => ({}), {
    name: "ballon-alert",
    storage: createJSONStorage(() => sessionStorage),
  }),
)

export const dispatchBallonOffer = (values: IDispatchBallonOffer) => {
  if (!!values.offer) {
    dispatchModal(EModalData.BalloonOffer)
    useBalloonOffer.setState(
      (_) => ({
        offer: values.offer,
      }),
      true,
    )
  } else {
    dispatchModalClose()
    useBalloonOffer.setState((_) => ({ offer: undefined }), true)
  }
}
export const dispatchBallonDiscussion = (values: IDispatchBallonOffer) => {
  if (!!values.offer) {
    dispatchModal(EModalData.BalloonDiscussion)
    useBalloonDiscussion.setState(
      (_) => ({
        offer: values.offer,
      }),
      true,
    )
  } else {
    dispatchModalClose()
    useBalloonDiscussion.setState((_) => ({ offer: undefined }), true)
  }
}

export const dispatchBallonAlert = (values: IDispatchBallonOffer) => {
  if (!!values.offer) {
    dispatchModal(EModalData.BalloonAlert)
    useBalloonAlert.setState(
      (_) => ({
        offer: values.offer,
      }),
      true,
    )
  } else {
    dispatchModalClose()
    useBalloonAlert.setState((_) => ({ offer: undefined }), true)
  }
}
