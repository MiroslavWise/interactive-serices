import type { FC } from "react"

export type TTypeIconNotification = "information" | "warning" | "error" | "avatar" | "barter"
export type TTypeIconCurrentNotification = "chat" | "barter" | "sos" | "alert" | "personal" | "default"

export interface IItemNotification {
  type: TTypeIconNotification
  currentType: TTypeIconCurrentNotification
}

export type TItemNotification = FC<IItemNotification>
