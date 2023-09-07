import type { Dispatch, DispatchWithoutAction } from "react"

import type { IResponseThreads } from "@/services/threads/types"

export interface IUseThread {
    threads: IResponseThreads[]
    total: number | undefined

    getThreads: Dispatch<number>
    reset: DispatchWithoutAction
}
