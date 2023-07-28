import type { IReturnData } from "../types/general"
import type { IResponseUploadFile, IUploadFile, IProvider } from "./types"

import { wrapperFetch } from "../requestsWrapper"

import { generateShortHash } from "@/lib/hash"

export function fileUploadService(uploadFile: File, provider: IProvider): Promise<IReturnData<IResponseUploadFile>> {
  const formData = new FormData()

  const file: IUploadFile = {
    name: `${provider.type}:${uploadFile.name}`,
    caption: uploadFile.name,
    ext: `.${uploadFile.name.split(".").at(-1)}`,
    alt: uploadFile.name,
    hash: generateShortHash(`${uploadFile.name}-${uploadFile.size}`),
    height: 0,
    width: 0,
    provider: `${provider.type}:${provider.userId}:${provider.profileId}`,
    size: uploadFile.size,
    thumb: ``,
    type: uploadFile.type,
    file: uploadFile,
  }

  formData.append('name', file.name)
  formData.append('alt', file.alt)
  formData.append('hash', file.hash)
  formData.append('ext', file.ext)
  formData.append('caption', file.caption)
  formData.append('type', file.type)
  formData.append('size', file.size.toString())
  formData.append('width', file.width.toString())
  formData.append('height', file.height.toString())
  formData.append("provider", file.provider)
  formData.append("file", file.file)

  return wrapperFetch.methodUploadFile("/files", formData)
}