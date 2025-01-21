import { ICompany } from "@/services/types/company"
import { TSchemaCompany } from "./schema"
import { IBodyCompany, patchCompany } from "@/services/companies"

interface IData {
  values: TSchemaCompany
  defaults: ICompany
}

export function updateCompany({ values, defaults }: IData) {
  const { id } = defaults
  const body: IBodyCompany = {}

  if (Object.entries(body).length > 0) {
    return patchCompany(body, id)
  } else {
    return Promise.resolve({ ok: "not update" } as const)
  }
}
