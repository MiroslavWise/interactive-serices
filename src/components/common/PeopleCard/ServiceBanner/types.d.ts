import type { Dispatch, FC, SetStateAction } from "react"
import type { IStateVisible } from "@/components/auth/Profile/types"

interface IPeopleCard {
  photo: string
  name: string
  geo: string
  rate: string | number
  services: {
    label: string
    photo: string
  }[]
  about: string
  userId: number
  setDataProfile?: Dispatch<SetStateAction<IStateVisible>>
}

export type TPeopleCard = FC<IPeopleCard>