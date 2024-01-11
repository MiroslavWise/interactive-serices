import { create } from "zustand"

import type { IActionReciprocalExchange, IStateReciprocalExchange } from "../types/createReciprocalExchange"

export const useReciprocalExchange = create<IStateReciprocalExchange>((set, get) => ({
    visible: false,
}))

export const dispatchReciprocalExchange = (values: IActionReciprocalExchange) =>
    useReciprocalExchange.setState((_) => ({
        ...values,
    }))
