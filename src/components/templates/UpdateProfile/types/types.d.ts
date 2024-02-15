import { Dispatch, SetStateAction } from "react"

export interface IValuesForm {
  firstName: string
  lastName: string
  username: string
  email: string
  gender: "male" | "female" | null
}

export interface IMageProfile {
  image: string
  file: { file: File | null; string: string }
  idProfile: number

  setFile: Dispatch<SetStateAction<{ file: File | null; string: string }>>
  refetch(): Promise<any>
}
