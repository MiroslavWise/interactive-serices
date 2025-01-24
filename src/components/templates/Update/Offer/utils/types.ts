import { schemaFeatureMember } from "@/services/addresses/types/geocodeSearch"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { descriptionOfferZod, titleOfferZod } from "@/components/templates/CreateNewOptionModal/utils/create.schema"

const schema = z.object({
  title: titleOfferZod,
  description: descriptionOfferZod,
  help: z.boolean().default(false),
  address: z.nullable(schemaFeatureMember.or(z.string()).or(z.number())).optional(),
})

export type TSchemaUpdateOffer = z.infer<typeof schema>
export const resolverUpdateOffer = zodResolver(schema)
