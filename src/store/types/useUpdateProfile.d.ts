import type { Dispatch } from "react"

export interface IUseUpdateProfileState{
    isVisible: boolean

    setVisible: Dispatch<boolean>
}