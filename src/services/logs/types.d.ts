import type { IReturnData } from "@/services/types/general"

export interface ILogsResponse {
    id: number
}

export interface IServiceLogs {
    route: string
    get(value?: Record<string, any>): Promise<IReturnData<ILogsResponse[]>>
}
