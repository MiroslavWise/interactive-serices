import { IBodyCompany, ICompanyExtend, patchCompany, postCompany } from "@/services/companies"
import { TSchemaAdvert } from "@/components/templates/AddAdverts/schema"

async function createCompany({ values }: { values: TSchemaAdvert }) {
  const title = values.title.trim()
  const inn = values.inn.trim()

  const body: IBodyCompany = {
    title: title,
    inn: inn,
  }

  const ad = values.ad.trim()
  if (ad) body.ad = ad
  const erid = values.erid.trim()
  if (erid) body.erid = values.erid
  const userId = values.userId
  if (userId) body.userId = userId
  const ogrn = values.ogrn
  if (ogrn) body.ogrn = ogrn

  return postCompany(body)
}

export { createCompany }
