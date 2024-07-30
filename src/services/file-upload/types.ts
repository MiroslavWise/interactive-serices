import { EnumTypeProvider } from "@/types/enum"
import { AxiosProgressEvent } from "axios"

type TTypeUploadFileImage = "image/png" | "image/jpeg" | "image/gif" | "image/bmp" | "image/tiff" | "image/svg+xml" | "image/webp"

export interface IResponseUploadFile {
  id: number
  attributes: {
    name: string
    alt: string
    hash: string
    ext: string
    caption: string
    type: TTypeUploadFileImage
    size: number
    width: number
    height: number
    provider: string
  }
}

export interface IProvider {
  type: EnumTypeProvider
  userId: number
  idSupplements: number
  onUploadProgress?: (value: AxiosProgressEvent, name: FormDataEntryValue | null) => void
}
