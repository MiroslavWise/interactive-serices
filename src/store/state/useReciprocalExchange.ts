import { create } from "zustand"

import type { IActionReciprocalExchange, IStateReciprocalExchange } from "../types/createReciprocalExchange"

export const useReciprocalExchange = create<IStateReciprocalExchange>((set, get) => ({
    visible: false,
    isCollapse: false,
}))

export const dispatchReciprocalExchange = (values: IActionReciprocalExchange) =>
    useReciprocalExchange.setState((_) => ({
        ...values,
    }))

export const dispatchReciprocalExchangeCollapse = (value: boolean) =>
    useReciprocalExchange.setState((_) => ({
        isCollapse: value,
    }))
