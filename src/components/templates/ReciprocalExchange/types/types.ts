import { IFeatureMember } from "@/services/addresses/types/geocodeSearch"

export interface IFormValues {
  description: string
  category?: number
  my_offer?: number
  select_new_proposal: ETypeOfNewCreated

  categoryId?: number
  description_new_offer: string
  check?: boolean
  addressFeature?: IFeatureMember
  address?: string
}

export enum ETypeOfNewCreated {
  interesting = "interesting",
  their = "their",
  new = "new",
}
