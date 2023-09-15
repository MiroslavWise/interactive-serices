import type { FC, Dispatch, SetStateAction } from "react"

interface INotifications {
    visibleNotification: boolean
    setVisibleNotification: Dispatch<SetStateAction<boolean>>
}

export type TNotifications = FC<INotifications>
