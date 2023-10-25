import type { ILogsResponse } from "@/services/logs/types"
import type { FC } from "react"

export interface IComponentsNotification extends ILogsResponse {}

export type TComponentsNotification = FC<IComponentsNotification>
