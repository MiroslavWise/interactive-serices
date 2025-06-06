import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const LIMIT_DESCRIPTION = 512
const LIMIT_TITLE = 144

const regexContent = /[^a-z0-9а-яёй\s]/i

const title = z
  .string()
  .trim()
  .min(1, { message: "Поле не может оставаться незаполненным" })
  .min(3, { message: "Не менее 3 символов в названии" })
  .max(LIMIT_TITLE, { message: `Название не более ${LIMIT_TITLE} символов` })
  .default("")
  .refine(
    (value) => {
      const split = value.trim().split("")

      let count = 0

      split.forEach((item) => {
        regexContent.lastIndex = 0
        const test = regexContent.test(item)
        if (test) {
          ++count
        }
      })

      if (count >= 5) {
        return false
      }

      return true
    },
    {
      message: "Название не может содержать более 5 символов, отличающихся от букв и цифр",
    },
  )

const schema = z.object({
  description: z
    .string()
    .trim()
    .min(1, { message: "Обязательное поле" })
    .min(3, { message: "Не менее 3-х символов в описании" })
    .max(LIMIT_DESCRIPTION, { message: `Не более ${LIMIT_DESCRIPTION} символов` })
    .default(""),
  title: title,
  address: z.string().optional().default(""),
  help: z.boolean(),
})

export type TSchema = z.infer<typeof schema>
export const resolverSchema = zodResolver(schema)
