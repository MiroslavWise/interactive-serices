import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  title: z.string().min(1, { message: "Заголовок компании не может быть пустым" }).default("").optional(),
  ad: z.string().min(1, { message: "Описание компании не может быть пустым" }).default("").optional(),
  erid: z.string().min(1, { message: "ID рекламы компании не может быть пустым" }).default("").optional(),
  inn: z.string().min(1, { message: "ИНН компании не может быть пустым" }).default("").optional(),
  ogrn: z.string().min(1, { message: "ОГРН компании не может быть пустым" }).default("").optional(),
})

export type TSchemaAdvert = z.infer<typeof schema>
export const resolver = zodResolver(schema)
