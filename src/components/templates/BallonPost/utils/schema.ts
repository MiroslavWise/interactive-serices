import { object, z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"

export const MAX_LENGTH_COMMENT = 2192

const schema = object({
  comment: z
    .string()
    .trim()
    .min(1, { message: "Поле не может оставаться пустым" })
    .max(MAX_LENGTH_COMMENT, { message: `Не более ${MAX_LENGTH_COMMENT} символов` })
    .default(""),
})

export const resolver = zodResolver(schema)
export type TSchema = z.infer<typeof schema>
