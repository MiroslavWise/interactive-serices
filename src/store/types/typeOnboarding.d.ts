import type { TTypeProvider } from "@/services/file-upload/types"

export interface IStateUseOnboarding {
    valid: IValuesInterface
    type: TTypeProvider | null | "pre-close"
    step: number
    visible: boolean
    isPreClose: boolean
}

export interface IValuesInterface {
    isAddress?: boolean
    isCategoryId?: boolean
    isTitle?: boolean
    isFiles?: boolean
}

export interface IOnboardingContinue {
    type: TTypeProvider | null
}

export type TActionOnboarding = "next" | "prev" | "open" | "continue" | "close" | "pre-close"
