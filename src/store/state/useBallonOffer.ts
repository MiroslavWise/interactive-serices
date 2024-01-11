import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { IDispatchBallonOffer, IStateBallonOffer } from "../types/createBallonOffer"

export const useBallonOffer = create(
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

export const dispatchBallonOffer = (values: IDispatchBallonOffer) =>
    useBallonOffer.setState((_) => ({
        ...values,
    }))
