import { Dispatch, SetStateAction } from "react"

export interface IMageProfile {
  image: string
  file: { file: File | null; string: string }
  errorFile: string | null

  setErrorFile: Dispatch<SetStateAction<string | null>>
  setFile: Dispatch<SetStateAction<{ file: File | null; string: string }>>
  refetch(): Promise<any>
}
