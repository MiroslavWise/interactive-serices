import type { IResponseNotifications } from "@/services/notifications/types"
import type { FC } from "react"

export interface IComponentsNotification extends IResponseNotifications {}

export type TComponentsNotification = FC<IComponentsNotification>
