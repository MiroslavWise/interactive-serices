import { create } from "zustand"

import type { IStateUseOnboarding, TActionOnboarding } from "../types/typeOnboarding"

export const useOnboarding = create<IStateUseOnboarding>((set, get) => ({
    step: 0,
    visible: false,
}))

export const dispatchOnboarding = (values: TActionOnboarding) =>
    useOnboarding.setState((_) => {
        if (values === "next") {
            return {
                step: _.step + 1,
            }
        } else if (values === "prev") {
            return {
                step: _.step - 1,
            }
        } else if (values === "open") {
            return {
                visible: true,
                step: 0,
            }
        } else if (values === "continue") {
            return {
                visible: true,
                step: _.step,
            }
        } else if (values === "close") {
            return {
                visible: false,
            }
        }
        return {}
    })
