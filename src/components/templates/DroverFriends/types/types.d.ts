import type { FC } from "react"
import type { TTypeFriends } from "@/store/types/createDroverFriends"

export interface IListFriends {
    list: number[]
    type: TTypeFriends
}

export interface IItemListFriend{
    id: number
    type: TTypeFriends
}

export type TListFriends = FC<IListFriends>
export type TItemListFriend= FC<IItemListFriend>