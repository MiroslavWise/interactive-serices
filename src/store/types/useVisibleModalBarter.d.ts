import type { Dispatch } from "react"

interface IDataProfile {
    photo: string
    fullName: string
    idUser: number
}

export interface IUseVisibleModalBarter {
    isVisible: boolean
    dataProfile: IDataProfile | undefined

    setIsVisibleBarter: Dispatch<{
        isVisible: boolean
        dataProfile?: IDataProfile
    }>
}
