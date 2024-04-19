import { ETypeOfNewCreated } from "../types/types"

interface I {
  label: string
  value: ETypeOfNewCreated
}

interface IIncoming {
  firstName: string
  values: ETypeOfNewCreated[]
}

const NEW_PROPOSALS_OBJ = ({ firstName = "" }: { firstName: string }): Record<ETypeOfNewCreated, I> => ({
  [ETypeOfNewCreated.interesting]: {
    label: `Из категорий интересных для ${firstName}`,
    value: ETypeOfNewCreated.interesting,
  },
  [ETypeOfNewCreated.their]: {
    label: "Из своих предложений",
    value: ETypeOfNewCreated.their,
  },
  [ETypeOfNewCreated.new]: {
    label: "Создать новое предложение",
    value: ETypeOfNewCreated.new,
  },
})

export const SELECT_NEW_PROPOSAL = ({ firstName = "", values = [ETypeOfNewCreated.new] }: IIncoming): I[] =>
  Object.values(NEW_PROPOSALS_OBJ({ firstName })).filter((item) => values.includes(item.value))
