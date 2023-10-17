import type { Dispatch, FC, SetStateAction } from "react"
import type { IStateVisible } from "@/components/auth/Profile/types"
import { ISmallDataOfferBarter } from "@/services/barters/types"

interface IPeopleCard {
    photo: string
    name: string
    geo: string
    rate: string | number
    services: {
        label: string
        photo: string
    }[]
    about: string
    userId: number
    offer: ISmallDataOfferBarter
    setDataProfile?: Dispatch<SetStateAction<IStateVisible>>
}

export type TPeopleCard = FC<IPeopleCard>
