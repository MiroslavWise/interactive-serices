import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { EnumTypeProvider } from "@/types/enum"
import { schemaFeatureMember, schemaPostAddress } from "@/services/addresses/types/geocodeSearch"

import { EModalData } from "@/store"

const regexContent = /[^a-z0-9а-яёй\s]/i

export const LIMIT_DESCRIPTION = 512
export const LIMIT_TITLE = 144

const help = z.boolean().default(false)
const userId = z.nullable(z.number()).default(null)

export const titleOfferZod = z
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

const categoryId = z
  .union([z.string(), z.number()])
  .nullable()
  .default(null)
  .refine((value) => ["string", "number"].includes(typeof value), {
    message: "Поле не может оставаться незаполненным",
  })
export const descriptionOfferZod = z
  .string()
  .trim()
  .min(1, { message: "Обязательное поле" })
  .min(3, { message: "Не менее 3-х символов в описании" })
  .max(LIMIT_DESCRIPTION, { message: `Не более ${LIMIT_DESCRIPTION} символов` })
  .default("")
const address = z.string().min(1, { message: "Поле не может оставаться незаполненным" }).default("")
const file = z.object({
  file: z.array(z.instanceof(File)),
  string: z.array(z.string()),
})
const addressFeature = schemaFeatureMember.refine((value) => !!value && typeof value === "object", {
  message: "Выберите существующий адрес",
})
const initAddress = schemaPostAddress.refine((value) => !!value && typeof value === "object", {
  message: "Выберите существующий адрес",
})

const base = z.object({
  description: descriptionOfferZod,
  address: address,
  type: z.nativeEnum(EnumTypeProvider),
  file: file,
  help: help,
  userId: userId,
  deletes: z.array(z.number()).default([]),
})

const schemaAlertAndDiscussion = base.merge(z.object({ title: titleOfferZod, addressFeature: addressFeature }))
const schemaAlertAndDiscussionMap = base.merge(z.object({ title: titleOfferZod, initAddress: initAddress }))
const schemaOffer = base.merge(z.object({ title: titleOfferZod, categoryId: categoryId, addressFeature: addressFeature }))
const schemaOfferMap = base.merge(z.object({ title: titleOfferZod, categoryId: categoryId, initAddress: initAddress }))
const schemaOfferCopy = base.merge(z.object({ title: titleOfferZod, categoryId: categoryId, addressFeature: addressFeature.optional() }))

const schemaCreate = base.extend({
  title: titleOfferZod,
  categoryId: categoryId,
  addressFeature: addressFeature,
  initAddress: initAddress,
})

export const resolverAlertAndDiscussion = zodResolver(schemaAlertAndDiscussion)
export const resolverAlertAndDiscussionMap = zodResolver(schemaAlertAndDiscussionMap)
export const resolverOffer = zodResolver(schemaOffer)
export const resolverOfferCopy = zodResolver(schemaOfferCopy)
export const resolverOfferMap = zodResolver(schemaOfferMap)

export type TSchemaCreate = z.infer<typeof schemaCreate>
