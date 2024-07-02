import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const LIMIT_TITLE_CREATE_OFFER_CATEGORY = 70

const title = z
  .string()
  .trim()
  .min(1, { message: "Поле не может оставаться незаполненным" })
  .max(LIMIT_TITLE_CREATE_OFFER_CATEGORY, { message: `Не более ${LIMIT_TITLE_CREATE_OFFER_CATEGORY} символов` })
  .default("")

export const schema = z.object({
  parentId: z.number().optional(),
  provider: z.string().optional(),
  title: title,
  slug: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  imageId: z.number().optional(),
  featuredId: z.number().optional(),
  bannerId: z.number().optional(),
  orderBy: z.number().optional(),
  enabled: z.boolean().default(true),
  tags: z.array(z.string()).default([]).optional(),
})

export type TCreateOfferCategory = z.infer<typeof schema>
export const resolverCreateOfferCategory = zodResolver(schema)
