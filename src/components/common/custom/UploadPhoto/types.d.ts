import type { Dispatch, FC, SetStateAction } from "react"

export interface IUploadPhoto {
    files: File
    index: number
    selected: string

    setFiles: Dispatch<File>
    setSelectedImage: Dispatch<string>
    deleteFile: Dispatch<number>
}

export type TUploadPhoto = FC<IUploadPhoto>
