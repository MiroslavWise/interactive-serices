import type { FC, Dispatch, SetStateAction } from "react"
import type { TAddCreate } from "@/store/types/useAddCreateModal"

interface INewServicesBanner {}

export interface INewCreateBadge {
    imageSrc: string
    label: string
    value: TAddCreate
}

export type TNewServicesBanner = FC<INewServicesBanner>
export type TNewCreateBadge = FC<INewCreateBadge>

export interface IPositionArticle {
    top?: number | string
    left?: number | string
    right?: number | string
    bottom?: number | string
}
