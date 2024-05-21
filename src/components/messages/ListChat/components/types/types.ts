import type { Dispatch, FC, SetStateAction } from "react"

import type { IResponseThreads } from "@/services/threads/types"
import type { IUserResponse } from "@/services/users/types"

interface IList {
  items: IResponseThreads[]
  search: string
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
}

export type TList = FC<IList>
export type TItemListChat = FC<IItemListChat>
export type TSearchBlock = FC<ISearchBlock>
export type TSegmentChatMobile = FC<ISegmentChatMobile>
