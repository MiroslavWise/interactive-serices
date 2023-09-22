import type { Dispatch, FC, SetStateAction } from "react"

export interface ICreationAlertAndDiscussionMap {
    isOpen: boolean
    coord: {
        x: number | string
        y: number | string
    }
    setIsOpen: Dispatch<SetStateAction<boolean>>
    refCreate: LegacyRef<HTMLDivElement>
}

export type TCreationAlertAndDiscussionMap = FC<ICreationAlertAndDiscussionMap>
