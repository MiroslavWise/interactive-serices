import { create } from "zustand"

import type { TTypeProvider } from "@/services/file-upload/types"

import type { IStateUseOnboarding, TActionOnboarding } from "../types/typeOnboarding"

export const useOnboarding = create<IStateUseOnboarding>((set, get) => ({
    type: null,
    step: 0,
    visible: false,
}))

export const dispatchOnboardingStart = (value: TTypeProvider | null) =>
    useOnboarding.setState((_) => {
        if (value === null) {
            return {
                visible: false,
            }
        } else {
            return {
                type: value,
                step: 0,
            }
        }
    })

export const dispatchOnboarding = (values: TActionOnboarding) =>
    useOnboarding.setState((_) => {
        if (values === "next") {
            if (_.step >= 5) {
                return {
                    visible: false,
                    type: null,
                }
            }
            if ([2, 2.5].includes(_.step) && _.type === "offer") {
                return {
                    step: _.step + 0.5,
                }
            }
            return {
                step: _.step + 1,
            }
        } else if (values === "prev") {
            if (_.step === 0) {
                return {}
            }

            if ([3, 2.5].includes(_.step) && _.type === "offer") {
                return {
                    step: _.step - 0.5,
                }
            }

            return {
                step: _.step - 1,
            }
        } else if (values === "open") {
            return {
                visible: true,
                step: 0,
                type: null,
            }
        } else if (values === "continue") {
            return {
                visible: true,
                step: _.step,
            }
        } else if (values === "close") {
            return {
                visible: false,
                type: null,
            }
        } else if (values === "pre-close") {
            return {}
        }
        return {}
    })
