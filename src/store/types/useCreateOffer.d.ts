import type { Dispatch, DispatchWithoutAction } from "react"

export interface IUseCreateOffer {
    id: number | undefined
    text: string
    valueCategory: string
    files: File[]
    selectedFilesString: string[]

    setId: Dispatch<number>
    setText: Dispatch<string>
    setValueCategory: Dispatch<string>
    setFiles: Dispatch<File>
    setSelectedFilesString: Dispatch<string>
    deleteFile: Dispatch<number>
    reset: DispatchWithoutAction
}
