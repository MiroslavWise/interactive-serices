import type { Dispatch, FC, SetStateAction } from "react"

import type { IResponseThreads } from "@/services/threads/types"
import type { IUserResponse } from "@/services/users/types/usersService"

interface IList {
    items: IFiltersItems[]
}

interface IItemListChat extends IFiltersItems {}

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
