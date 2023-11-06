import type { DispatchWithoutAction, FC } from "react"

interface IBadgeGradient {
    coins: number
    about: string
    handleClick?: DispatchWithoutAction
    classNames?: any[]
    type: "optional-2" | "optional-1" | "optional-3"
}

export type TBadgeGradient = FC<IBadgeGradient>
