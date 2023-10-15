import type { Dispatch, FC, SetStateAction } from "react"

import type {
    IResponseThreads,
    TTypeProviderThreads,
} from "@/services/threads/types"
import type { IUserResponse } from "@/services/users/types/usersService"

interface IList {
    items: IFiltersItems[]
    search: string
    setTotal: Dispatch<SetStateAction<number>>
}

interface IItemListChat extends IFiltersItems {
    last: boolean
}

interface ISearchBlock {
    search: string
    setSearch: Dispatch<SetStateAction<string>>
}

export interface IFiltersItems {
    thread: IResponseThreads
    people: IUserResponse
}

export type TList = FC<IList>
export type TItemListChat = FC<IItemListChat>
export type TSearchBlock = FC<ISearchBlock>
