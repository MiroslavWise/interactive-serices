import type { Dispatch, FC, SetStateAction } from "react"

import type { IResponseThreads, TTypeProviderThreads } from "@/services/threads/types"
import type { IUserResponse } from "@/services/users/types"
import type { ISegmentValues } from "@/components/common/Segments/types"

interface IList {
    items: IFiltersItems[]
    search: string
    setTotal: Dispatch<SetStateAction<number>>
    loadUser: boolean
}

interface IItemListChat extends IFiltersItems {
    last: boolean
}

interface ISearchBlock {
    search: string
    setSearch: Dispatch<SetStateAction<string>>
}

interface ISegmentChatMobile {}

export interface IFiltersItems {
    thread: IResponseThreads
    people: IUserResponse
}

export type TList = FC<IList>
export type TItemListChat = FC<IItemListChat>
export type TSearchBlock = FC<ISearchBlock>
export type TSegmentChatMobile = FC<ISegmentChatMobile>
