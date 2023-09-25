import type { Dispatch, DispatchWithoutAction } from "react"
import type { TProviderOffer } from "@/services/types/general"

export interface IUseCreateOffer {
    id: number | undefined
    text: string
    valueCategory:
        | {
              id: number
              slug: TProviderOffer
          }
        | undefined
    files: File[]
    selectedFilesString: string[]
    adressId: { id: number } | undefined

    setAddressId: Dispatch<{ id: number }>
    setId: Dispatch<number>
    setText: Dispatch<string>
    setValueCategory: Dispatch<{
        id: number
        slug: TProviderOffer
    }>
    setFiles: Dispatch<File>
    setSelectedFilesString: Dispatch<string>
    deleteFile: Dispatch<number>
    reset: DispatchWithoutAction
}
