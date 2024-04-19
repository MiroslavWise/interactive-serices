// import { encode } from "blurhash"

import type { IReturnData } from "../types/general"
import type { IResponseUploadFile, IProvider } from "./types"

import { wrapperUploadFile } from "../requestsWrapper"

import { generateShortHash } from "@/lib/hash"

function getFileDimensions(uploadFile: File): Promise<{ width: number; height: number }> {
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

export async function fileUploadService(uploadFile: File, provider: IProvider): Promise<IReturnData<IResponseUploadFile>> {
  const dimensions = await getFileDimensions(uploadFile)

  const formData = new FormData()
  formData.append("name", `${provider.type}_${uploadFile.name?.replaceAll(":", "_")}`)
  formData.append("caption", uploadFile.name)
  formData.append("ext", `.${uploadFile.name.split(".").at(-1)}`)
  formData.append("alt", uploadFile.name)
  formData.append("hash", "")
  // formData.append("hash", resolve ?? "")
  formData.append("height", dimensions.height.toString())
  formData.append("width", dimensions.width.toString())
  formData.append("provider", `${provider.type}:${provider.userId}:${provider.idSupplements}`)
  formData.append("size", uploadFile.size.toString())
  formData.append("thumb", generateShortHash(`${uploadFile.name}-${uploadFile.size}`))
  formData.append("type", uploadFile.type)
  formData.append("file", uploadFile)

  return await wrapperUploadFile({ url: "/files/upload", file: formData })
}

// const loadImage = async (src: any) =>
//   new Promise((resolve, reject) => {
//     const img = new Image()
//     img.onload = () => resolve(img)
//     img.onerror = (...args) => reject(args)
//     img.src = src
//   })

// function getImageData(image: any) {
//   const canvas = document.createElement("canvas")
//   canvas.width = image.width
//   canvas.height = image.height
//   const context = canvas.getContext("2d")
//   if (context) {
//     context.drawImage(image, 0, 0)
//     return context.getImageData(0, 0, image.width, image.height)
//   }
//   return null
// }

// async function encodeImageToBlurhash(imageUrl: ImageData | null) {
//   if (imageUrl) {
//     const image = await loadImage(imageUrl)
//     const imageData = getImageData(image)
//     return encode(imageData!?.data, imageData!?.width, imageData!?.height, 4, 4)
//   }
//   return null
// }
