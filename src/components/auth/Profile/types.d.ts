import type { FC, Dispatch, SetStateAction, DispatchWithoutAction } from "react"

export interface IDataProfile {
    name: string
    geo: string
    photo: string
    about: string
    userId: number
}

export interface IStateVisible {
    isService: boolean
    isProfile: boolean
    dataProfile: IDataProfile | null
}
