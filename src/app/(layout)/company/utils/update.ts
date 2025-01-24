import { type TSchemaCompany } from "./schema"
import { type ICompany } from "@/services/types/company"
import { type IBodyCompany, patchCompany } from "@/services/companies"

interface IData {
  values: TSchemaCompany
  defaults: ICompany
}

export function updateCompany({ values, defaults }: IData) {
  const { id } = defaults
  const body: Partial<IBodyCompany> = {}

  const newTitle = values.title.trim() ?? ""
  const oldTitle = defaults?.title ?? ""
  if (newTitle !== oldTitle) {
    body.title = newTitle
  }
  const newAd = values.ad ?? ""
  const oldAd = defaults?.ad ?? ""
  if (newAd !== oldAd) {
    body.ad = oldAd
  }

  const newINN = values.inn ?? ""
  const oldINN = defaults.inn ?? ""
  if (newINN !== oldINN) {
    body.inn = newINN
  }

  const newERID = values.erid ?? ""
  const oldERID = defaults.erid ?? ""
  if (newERID !== oldERID) {
    body.erid = newERID
  }

  const newOGRN = values.ogrn ?? ""
  const oldOGRN = defaults.ogrn ?? ""
  if (newOGRN !== oldOGRN) {
    body.ogrn = newOGRN
  }

  if (Object.entries(body).length > 0) {
    return patchCompany(body, id)
  } else {
    return Promise.resolve({ ok: "not update" } as const)
  }
}
