import { IFeatureMember } from "@/services/addresses/types/geocodeSearch"

export interface IFormValues {
  title: string
  address: any
  addressFeature: IFeatureMember
  categoryId: number | null
  content: string
}
