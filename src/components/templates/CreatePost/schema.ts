import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { schemaFeatureMember, schemaPostAddress } from "@/services/addresses/types/geocodeSearch"
import { MAX_LENGTH_DESCRIPTION_NOTE } from "@/config/constants"

export const LIMIT_TITLE_POST = 144

const regexContent = /[^a-z0-9а-яёй\s]/i

const userId = z.nullable(z.number()).default(null)
const address = z.string().min(1, { message: "Поле не может оставаться незаполненным" }).default("")
const addressFeature = schemaFeatureMember.refine((value) => !!value && typeof value === "object", {
  message: "Выберите существующий адрес",
})
const initAddress = schemaPostAddress.refine((value) => !!value && typeof value === "object", {
  message: "Выберите существующий адрес",
})
const title = z
  .string()
  .trim()
  .min(1, { message: "Поле не может оставаться незаполненным" })
  .min(3, { message: "Не менее 3 символов в названии" })
  .max(LIMIT_TITLE_POST, { message: `Название не более ${LIMIT_TITLE_POST} символов` })
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
  .min(1, { message: "Обязательное поле" })
  .min(3, { message: "Не менее 3-х символов в описании" })
  .max(MAX_LENGTH_DESCRIPTION_NOTE, { message: `Не более ${MAX_LENGTH_DESCRIPTION_NOTE} символов` })
  .default("")

const file = z.object({
  file: z.array(z.instanceof(File)),
  string: z.array(z.string()),
})

const help = z.boolean().default(false)

const schema = z.object({
  title: title,
  description: description,
  address: address,
  addressFeature: addressFeature,
  file,
  help,
  isParticipants: z.boolean().default(false),
  userId: userId,
})

const schemaInitAddress = z.object({
  title: title,
  description: description,
  address: address,
  initAddress: initAddress,
  file,
  help,
  isParticipants: z.boolean().default(false),
  userId: userId,
})

const extendSchema = schema.merge(schemaInitAddress)

const schemaUpdate = z.object({
  title: title,
  description: description,
  address: address.optional(),
  file,
  help,
  isParticipants: z.boolean().default(false),
  deletesImages: z.array(z.number()),
  addressFeature: schemaFeatureMember?.nullable()?.optional().default(null),
})

export const resolverCreatePost = zodResolver(schema)
export const resolverCreatePostMap = zodResolver(schemaInitAddress)
export const resolverCreatePostUpdate = zodResolver(schemaUpdate)
export type TSchemaCreatePost = z.infer<typeof extendSchema>
export type TSchemaCreatePostUpdate = z.infer<typeof schemaUpdate>
