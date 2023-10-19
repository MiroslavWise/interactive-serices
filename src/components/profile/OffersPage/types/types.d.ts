import type { TTypeStatusBarter } from "@/services/file-upload/types"

export interface IStateOffers {
    isToMe: boolean
    total: number
}

export interface IActionOffers {
    isToMe?: boolean
    total?: number
}
