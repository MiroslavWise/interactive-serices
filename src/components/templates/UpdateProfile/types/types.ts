import { Dispatch, SetStateAction } from "react"

export interface IMageProfile {
  image: string
  file: { file: File | null; string: string }
  idProfile: number

  setFile: Dispatch<SetStateAction<{ file: File | null; string: string }>>
  refetch(): Promise<any>
}
