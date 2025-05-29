import { type ChangeEvent } from "react"
import { MAX_SIZE_IMAGE, MAX_SIZE_VIDEO, TIME_PROMISE_UPLOAD_FILE } from "../constants"

interface IProps {
  current: {
    file: File[]
    string: string[]
  }
  event: ChangeEvent<HTMLInputElement>
}

export async function onChangeFile({ current, event }: IProps) {
  const inputFiles = event.target.files

  let filesReady = {
    file: [...current.file] as File[],
    string: [...current.string] as string[],
  }

  if (inputFiles) {
    for (let i = 0; i < inputFiles.length; i++) {
      const file = inputFiles[i]

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

  await new Promise((r) => setTimeout(r, TIME_PROMISE_UPLOAD_FILE))

  return Promise.resolve({
    file: filesReady.file.splice(0, 9),
    string: filesReady.string.splice(0, 9),
  })
}
