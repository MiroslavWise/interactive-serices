import { EnumTypeProvider } from "@/types/enum"
import type { FC, Dispatch, SetStateAction } from "react"

export type TServicesFilter = "all" | EnumTypeProvider

interface IServicesFC {
  setTotal: Dispatch<SetStateAction<number>>
}

export type TServicesFC = FC<IServicesFC>

export interface IValuesFormFilters {
  actives: number[]
}
