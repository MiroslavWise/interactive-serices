export type TTypeUploadFileImage =
    | "image/png"
    | "image/jpeg"
    | "image/gif"
    | "image/bmp"
    | "image/tiff"
    | "image/svg+xml"
    | "image/webp"

export interface IUploadFile {
    name: string
    caption: string
    ext: string
    alt: string
    hash: string
    height: number
    width: number
    provider: string
    size: number
    thumb: string
    type: string
    file: File
}

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

type TTypeProvider =
    | "profile"
    | "offer"
    | "discussion"
    | "alert"
    | "request"
    | "offer-request"

export interface IProvider {
    type: TTypeProvider
    userId: number
    idSupplements: number
}
