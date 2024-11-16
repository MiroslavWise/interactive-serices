import { MAX_SIZE_IMAGE } from "@/helpers/constants"
import { type ChangeEvent } from "react"

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
        if (file.type.includes("image") && file.size < MAX_SIZE_IMAGE) {
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
              string: [...filesReady.string, f!.target!.result as string],
            }
          }
        }
      }
    }
  }

  await new Promise((r) => setTimeout(r, 50))

  return Promise.resolve({
    file: filesReady.file.splice(0, 5),
    string: filesReady.string.splice(0, 5),
  })
}

interface IPropsDelete {
  current: {
    string: string[]
    file: File[]
  }
  index: number
}

export function dispatchDelete({ current, index }: IPropsDelete) {
  const strings = current.string.filter((_, i) => i !== index)
  const files = current.file.filter((_, i) => i !== index)

  return {
    string: strings,
    file: files,
  }
}
