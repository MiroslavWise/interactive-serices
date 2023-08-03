import type { FC } from "react"

interface IRate{
        rate: number | string
        className?: string
        size?: number
}

export type TRate = FC<IRate>