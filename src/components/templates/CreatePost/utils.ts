import { type AxiosProgressEvent } from "axios"
import { type Dispatch, type SetStateAction } from "react"

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
