import { type AxiosProgressEvent } from "axios"
import { type Dispatch, type SetStateAction } from "react"

import { TSchema } from "./schema"

export const DEFAULT_VALUES: TSchema = {
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
