import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { type AxiosProgressEvent } from "axios"
import { type Dispatch, type SetStateAction } from "react"

import { MAX_LENGTH_DESCRIPTION_NOTE } from "@/config/constants"

const sleep = () => new Promise((r) => setTimeout(r, 50))

const description = z
  .string()
  .trim()
  .max(MAX_LENGTH_DESCRIPTION_NOTE, { message: `Не более ${MAX_LENGTH_DESCRIPTION_NOTE} символов` })
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
