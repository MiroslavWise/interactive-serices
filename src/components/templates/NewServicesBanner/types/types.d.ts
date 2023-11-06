import type { FC, Dispatch, SetStateAction } from "react"
import type { TAddCreate } from "@/store/types/useAddCreateModal"

interface INewServicesBanner {}

export interface INewCreateBadge {
    imageSrc: string
    label: string
    value: TAddCreate | null
}

export type TNewServicesBanner = FC<INewServicesBanner>
export type TNewCreateBadge = FC<INewCreateBadge>
