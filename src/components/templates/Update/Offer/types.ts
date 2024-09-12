import { IFeatureMember } from "@/services/addresses/types/geocodeSearch"

export interface IValues {
  address: string | number | null | IFeatureMember
  description: string
  help?: boolean
}
