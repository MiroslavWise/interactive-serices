import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { schemaFeatureMember } from "@/services/addresses/types/geocodeSearch"

const LIMIT_TITLE = 144
export const LIMIT_DESCRIPTION = 400

const regexContent = /[^a-z0-9а-яёй\s]/i

const address = z.string().min(1, { message: "Поле не может оставаться незаполненным" }).default("")
const addressFeature = schemaFeatureMember.refine((value) => !!value && typeof value === "object", {
  message: "Выберите существующий адрес",
})
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
const description = z
  .string()
  .trim()
  .max(LIMIT_DESCRIPTION, { message: `Не более ${LIMIT_DESCRIPTION} символов` })
  .default("")

const file = z.object({
  file: z.array(z.instanceof(File)),
  string: z.array(z.string()),
})

const schema = z.object({
  title: title,
  description: description,
  address: address,
  addressFeature: addressFeature,
  file,
})

export const resolverCreate = zodResolver(schema)
export type TSchemaCreatePost = z.infer<typeof schema>
