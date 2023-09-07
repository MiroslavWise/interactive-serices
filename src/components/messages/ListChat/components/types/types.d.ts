import type { FC } from "react"

import type { IResponseThreads } from "@/services/threads/types"

interface IList{
  items: IResponseThreads[]
}

interface IItemListChat{
  item: IResponseThreads
}

export type TList = FC<IList>
export type TItemListChat = FC<IItemListChat>