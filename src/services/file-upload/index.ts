import { type IResponseUploadFile, type IProvider } from "./types"

import { type IResponse, postForm } from "../request"

import { clg } from "@console"
import { generateShortHash } from "@/lib/hash"

async function getFileDimensions(uploadFile: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const img = new Image()
      img.onload = () => {
        const dimensions = {
          width: img.naturalWidth,
          height: img.naturalHeight,
        }
        resolve(dimensions)
      }
      img.onerror = () => reject(new Error("Не удалось загрузить изображение."))
      img.src = e.target?.result as string
    }

    reader.onerror = () => reject(new Error("Не удалось прочитать файл."))
    reader.readAsDataURL(uploadFile)
  })
}

export async function fileUploadService(uploadFile: File, provider: IProvider): Promise<IResponse<IResponseUploadFile>> {
  const dimensions = await getFileDimensions(uploadFile)
  clg("fileUploadService provider", provider)

  const formData = new FormData()
  formData.append("name", `${provider.type}_${uploadFile.name?.replaceAll(":", "_")}`) //type: profile | offer | discussion | alert | threads
  formData.append("caption", uploadFile.name)
  formData.append("ext", `.${uploadFile.name.split(".").at(-1)}`)
  formData.append("alt", uploadFile.name)
  formData.append("hash", "")
  formData.append("height", dimensions.height.toString())
  formData.append("width", dimensions.width.toString())
  formData.append("provider", `${provider.type}:${provider.userId}:${provider.idSupplements}`) //idSupplements - id оффера или чата, или другой сущности
  formData.append("size", uploadFile.size.toString())
  formData.append("thumb", generateShortHash(`${uploadFile.name}-${uploadFile.size}`))
  formData.append("type", uploadFile.type)
  formData.append("file", uploadFile)

  return await postForm({ url: "/files/upload", file: formData, onUploadProgress: provider?.onUploadProgress })
}
