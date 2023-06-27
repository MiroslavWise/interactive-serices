import type { FC, Dispatch, SetStateAction } from "react"
import type { IStateVisible } from "../types"

interface IServiceBanner{
        active: boolean
        setDataAndActive: Dispatch<SetStateAction<IStateVisible>>
}

export type TServiceBanner = FC<IServiceBanner>