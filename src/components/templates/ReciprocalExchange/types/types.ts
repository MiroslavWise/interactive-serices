export interface IFormValues {
  description: string
  category?: number
  my_offer?: number
  select_new_proposal: ETypeOfNewCreated
  description_new_offer: string
  categoryId?: number
}

export enum ETypeOfNewCreated {
  interesting = "interesting",
  their = "their",
  new = "new",
}
