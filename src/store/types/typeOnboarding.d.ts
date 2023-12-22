export interface IStateUseOnboarding {
    step: number
    visible: boolean
}

export type TActionOnboarding = "next" | "prev" | "open" | "continue" | "close"
