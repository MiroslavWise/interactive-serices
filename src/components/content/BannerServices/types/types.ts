import { EnumTypeProvider } from "@/types/enum"

export type TServicesFilter = "all" | EnumTypeProvider

export interface IValuesFormFilters {
  actives: number[]
}
