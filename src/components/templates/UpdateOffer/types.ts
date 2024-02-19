import { IFeatureMember } from "@/services/addresses/types/geocodeSearch"

export interface IValues {
  address: string | number | null | IFeatureMember
  category: number | string | null
  description: string
}
