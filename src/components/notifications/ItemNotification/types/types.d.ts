import type { FC } from "react"

export type TTypeIconNotification = "information" | "warning" | "error" | "avatar"
export type TTypeIconCurrentNotification = "chat" | "barters" | "sos" | "alert" | "personal"

export interface IItemNotification {
    type: TTypeIconNotification
    currentType: TTypeIconCurrentNotification
}

export type TItemNotification = FC<IItemNotification>
