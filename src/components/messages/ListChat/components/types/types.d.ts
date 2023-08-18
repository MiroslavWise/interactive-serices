import type { FC } from "react"

import type { IGetProfileIdResponse } from "@/services/profile/types/profileService"

interface IList{
  items: IGetProfileIdResponse[]
}

interface IItemListChat{
  item: IGetProfileIdResponse
}

export type TList = FC<IList>
export type TItemListChat = FC<IItemListChat>