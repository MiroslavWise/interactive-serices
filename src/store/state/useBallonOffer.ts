import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { IDispatchBallonOffer, IStateBallonOffer } from "../types/createBallonOffer"

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

export const dispatchBallonOffer = (values: IDispatchBallonOffer) =>
  useBalloonOffer.setState((_) => ({
    ...values,
  }))
export const dispatchBallonDiscussion = (values: IDispatchBallonOffer) =>
  useBalloonDiscussion.setState((_) => ({
    ...values,
  }))
export const dispatchBallonAlert = (values: IDispatchBallonOffer) =>
  useBalloonAlert.setState((_) => ({
    ...values,
  }))
