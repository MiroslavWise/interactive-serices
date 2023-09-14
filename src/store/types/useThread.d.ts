import type { Dispatch, DispatchWithoutAction } from "react"

import type { IResponseThreads } from "@/services/threads/types"

export interface IUseThread {
    threads: IResponseThreads[]
    total: number | undefined
    search: string

    setSearch: Dispatch<string>
    getThreads: Dispatch<number>
    reset: DispatchWithoutAction
}
