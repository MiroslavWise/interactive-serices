import type { FC } from "react"
import type { TTypeProvider } from "@/services/file-upload/types"

export interface IBadgeServices {
    photo: string
    label: string
    type?: TTypeProvider
}

export type TBadgeServices = FC<IBadgeServices>
