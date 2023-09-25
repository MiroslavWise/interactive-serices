import type { IPostAddress } from "@/services/addresses/types/serviceAddresses"
import { Dispatch } from "react"

export interface ICreateGeneralOffers {
    addressInit?: IPostAddress | null
    text: string
    files: File[]
    selectedFile: string[]

    setText: Dispatch<string>
    setFile: Dispatch<File>
    setSelectedFile: Dispatch<string>
    setAddressInit?: Dispatch<IPostAddress | null>
}
