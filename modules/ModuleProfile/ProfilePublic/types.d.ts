import type { FC, Dispatch, SetStateAction } from "react"
import type { IStateVisible, IDataProfile } from "../types"

interface IProfilePublicModule{
        active: boolean
        profile: IDataProfile | null
        setActive: Dispatch<SetStateAction<IStateVisible>>
}

export type TProfilePublicModule = FC<IProfilePublicModule>