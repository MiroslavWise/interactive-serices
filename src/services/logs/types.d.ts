import type { IReturnData } from "@/services/types/general"
import { TTypeProvider, TTypeStatusBarter } from "../file-upload/types"

export interface ILogsResponse {
    id: number
    operation: "create" | "update"
    data: {
        entity: {
            provider: TTypeProvider
            title: string
            user_id: number
            status: TTypeStatusBarter
        }
        name: "Offer" | "Barter" | "Testimonials"
    }
    created: Date
    [key: string]: any
}

export interface IServiceLogs {
    route: string
    get(value?: Record<string, any>): Promise<IReturnData<ILogsResponse[]>>
}
