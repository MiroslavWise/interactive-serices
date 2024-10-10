import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { type AxiosProgressEvent } from "axios"
import { type ChangeEvent, type Dispatch, type SetStateAction } from "react"

export const LIMIT_DESCRIPTION = 1024
const sleep = () => new Promise((r) => setTimeout(r, 50))
const description = z
  .string()
  .trim()
  .max(LIMIT_DESCRIPTION, { message: `Не более ${LIMIT_DESCRIPTION} символов` })
  .default("")
  .optional()
const file = z.object({
  file: z.array(z.instanceof(File)),
  string: z.array(z.string()),
})
const schemaNote = z.object({
  description: description,
  file: file,
  is: z.boolean().default(false),
})

export const resolverCreateNote = zodResolver(schemaNote)
export type TSchemaCreateNote = z.infer<typeof schemaNote>
export const DEFAULT_VALUES: TSchemaCreateNote = {
  description: "",
  file: {
    file: [],
    string: [],
  },
  is: false,
}

type TProgress = Record<string, AxiosProgressEvent>

interface IProgress {
  files: File[]
  index: number
  progress: TProgress
}

export function onProgress({ files, index, progress }: IProgress) {
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
  setProgress: Dispatch<SetStateAction<TProgress>>,
) {
  setProgress((prev) => ({
    ...prev,
    [String(name)]: value,
  }))
}

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
        if (file.size < 9.9 * 1024 * 1024) {
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

  await sleep()

  return Promise.resolve({
    file: filesReady.file.splice(0, 9),
    string: filesReady.string.splice(0, 9),
  })
}
