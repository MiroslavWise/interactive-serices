import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { IDispatchBallonOffer, IStateBallonOffer } from "../types/createBallonOffer"

export const useBalloonOffer = create(
  persist<IStateBallonOffer>(
    (set, get) => ({
      visible: false,
    }),
    {
      name: "ballon-offer",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
export const useBalloonDiscussion = create(
  persist<IStateBallonOffer>(
    (set, get) => ({
      visible: false,
    }),
    {
      name: "ballon-discussion",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export const dispatchBallonOffer = (values: IDispatchBallonOffer) =>
  useBalloonOffer.setState((_) => ({
    ...values,
  }))
export const dispatchBallonDiscussion = (values: IDispatchBallonOffer) =>
  useBalloonDiscussion.setState((_) => ({
    ...values,
  }))
