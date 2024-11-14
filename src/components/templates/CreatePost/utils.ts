import { Dispatch, SetStateAction, type ChangeEvent } from "react"
import { type AxiosProgressEvent } from "axios"

import { MAX_SIZE_IMAGE, MAX_SIZE_VIDEO } from "@/helpers/constants"

export async function handleImageChange(
  current: {
    file: File[]
    string: string[]
  },
  event: ChangeEvent<HTMLInputElement>,
) {
  const files = event.target.files

  let filesReady = {
    file: [...current.file] as File[],
    string: [...current.string] as string[],
  }

  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (file) {
        if ((file.type.includes("image") && file.size < MAX_SIZE_IMAGE) || (file.type.includes("video") && file.size < MAX_SIZE_VIDEO)) {
          const is = current.file.some((_) => _.size === file.size && _.name === file.name)

          if (is) {
            continue
          }

          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function (f) {
            filesReady = {
              ...filesReady,
              file: [...filesReady.file, file],
              string: [...filesReady.string, file.type.includes("image") ? (f!.target!.result as string) : file.type],
            }
          }
        }
      }
    }
  }

  await new Promise((r) => setTimeout(r, 150))

  return Promise.resolve({
    file: filesReady.file.splice(0, 9),
    string: filesReady.string.splice(0, 9),
  })
}

export const onProgress = (files: File[], index: number, progress: Record<string, AxiosProgressEvent>): number => {
  const file = files[index]
  const name = file?.name

  if (Object.hasOwn(progress, name)) {
    return (progress[name].loaded / (progress[name].total! || 1)) * 100
  }

  return 0
}

export function onUploadProgress(
  value: AxiosProgressEvent,
  name: FormDataEntryValue | null,
  setProgress: Dispatch<SetStateAction<Record<string, AxiosProgressEvent>>>,
) {
  setProgress((prev) => ({
    ...prev,
    [String(name)]: value,
  }))
}
