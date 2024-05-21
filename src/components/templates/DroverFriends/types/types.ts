import type { FC } from "react"
import type { TTypeFriends } from "@/store/types/createDroverFriends"
import type { IFriendsResponse } from "@/services/friends/types"

export interface IListFriends {
  list: IFriendsResponse[]
  type: TTypeFriends
}

export interface IEnabledHook {
  enabled?: boolean
  type?: TTypeFriends | "list"
}

export interface IItemListFriend {
  user: IFriendsResponse
  type: TTypeFriends
}

export type TListFriends = FC<IListFriends>
export type TItemListFriend = FC<IItemListFriend>
