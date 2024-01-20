import type { Dispatch, FC, SetStateAction } from "react"

import type { IPostAddress } from "@/services/addresses/types/serviceAddresses"

export interface ICreationAlertAndDiscussionMap {
    isOpen: boolean
    addressInit?: IPostAddress
    refCreate: LegacyRef<HTMLDivElement>

    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export type TCreationAlertAndDiscussionMap = FC<ICreationAlertAndDiscussionMap>
