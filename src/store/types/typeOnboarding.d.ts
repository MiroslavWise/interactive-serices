import type { TTypeProvider } from "@/services/file-upload/types"

export interface IStateUseOnboarding {
    type: TTypeProvider | null
    step: number
    visible: boolean
}

export type TActionOnboarding = "next" | "prev" | "open" | "continue" | "close" | "pre-close"
