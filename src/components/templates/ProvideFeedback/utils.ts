import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const { object, string, array, number } = z

export const MIN_LENGTH = 16
export const MAX_LENGTH = 2000

const file = z.object({
  file: z.array(z.instanceof(File)),
  string: z.array(z.string()),
})

const schema = object({
  message: string()
    .trim()
    .min(1, { message: "Поле обязательно для заполнения" })
    .min(MIN_LENGTH, { message: `Не менее ${MIN_LENGTH} символов` })
    .max(MAX_LENGTH, { message: `Достигнут лимит символов` }),
  rating: number().default(3),
  file: file,
})

export const resolver = zodResolver(schema)
export type TSchema = z.infer<typeof schema>
