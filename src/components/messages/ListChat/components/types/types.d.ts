import type { Dispatch, FC, SetStateAction } from "react"

import type { IResponseThreads } from "@/services/threads/types"

interface IList {
    items: IResponseThreads[]
}

interface IItemListChat {
    item: IResponseThreads
}

interface ISearchBlock {
    search: string
    setSearch: Dispatch<SetStateAction<string>>
}

export type TList = FC<IList>
export type TItemListChat = FC<IItemListChat>
export type TSearchBlock = FC<ISearchBlock>
