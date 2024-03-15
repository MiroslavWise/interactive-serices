import { ETypeOfNewCreated } from "../types/types"

export const SELECT_NEW_PROPOSAL = ({ firstName }: { firstName: string }): { label: string; value: ETypeOfNewCreated }[] => [
  {
    label: `Из категорий интересных для ${firstName}`,
    value: ETypeOfNewCreated.interesting,
  },
  {
    label: "Из своих предложений",
    value: ETypeOfNewCreated.their,
  },
  {
    label: "Создать новое предложение",
    value: ETypeOfNewCreated.new,
  },
]
