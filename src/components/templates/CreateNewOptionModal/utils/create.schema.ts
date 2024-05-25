import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { EnumTypeProvider } from "@/types/enum"
import { schemaFeatureMember, schemaPostAddress } from "@/services/addresses/types/geocodeSearch"

import { EModalData } from "@/store"

const regexContent = /[^a-z0-9а-яёй\s]/i

export const LIMIT_DESCRIPTION = 512
export const LIMIT_TITLE_CONTENT = 32

const title = z
  .string()
  .trim()
  .min(1, { message: "Поле не может оставаться незаполненным" })
  .min(3, { message: "Не менее 3 символов в названии" })
  .max(LIMIT_TITLE_CONTENT, { message: "Название не более 32 символов" })
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
const description = z
  .string()
  .trim()
  .min(1, { message: "Обязательное поле" })
  .min(3, { message: "Не менее 3-х символов в описании" })
  .max(LIMIT_DESCRIPTION, { message: "Не более 512 символов" })
  .default("")
const address = z.string().min(1, { message: "Поле не может оставаться незаполненным" }).default("")
const file = z.object({
  file: z.array(z.instanceof(File)),
  string: z.array(z.string()),
})
const addressFeature = schemaFeatureMember.refine((value) => !!value && typeof value === "object", {
  message: "Поле не может оставаться незаполненным",
})
const initAddress = schemaPostAddress.refine((value) => !!value && typeof value === "object", {
  message: "Поле не может оставаться незаполненным",
})

const base = z.object({
  description: description,
  address: address,
  type: z.nativeEnum(EnumTypeProvider),
  typeModal: z.nativeEnum(EModalData),
  file: file,
})

const schemaAlertAndDiscussion = base.merge(z.object({ title: title, addressFeature: addressFeature }))
const schemaAlertAndDiscussionMap = base.merge(z.object({ title: title, initAddress: initAddress }))
const schemaOffer = base.merge(z.object({ categoryId: categoryId, addressFeature: addressFeature }))
const schemaOfferMap = base.merge(z.object({ categoryId: categoryId, initAddress: initAddress }))

const schemaCreate = base.extend({
  title: title,
  categoryId: categoryId,
  addressFeature: addressFeature,
  initAddress: initAddress,
})

export type TSchemaAlertAndDiscussion = z.infer<typeof schemaAlertAndDiscussion>
export type TSchemaAlertAndDiscussionMap = z.infer<typeof schemaAlertAndDiscussionMap>
export type TSchemaOffer = z.infer<typeof schemaOffer>
export type TSchemaOfferMap = z.infer<typeof schemaOfferMap>

export const resolverAlertAndDiscussion = zodResolver(schemaAlertAndDiscussion)
export const resolverAlertAndDiscussionMap = zodResolver(schemaAlertAndDiscussionMap)
export const resolverOffer = zodResolver(schemaOffer)
export const resolverOfferMap = zodResolver(schemaOfferMap)

export type TSchemaCreate = z.infer<typeof schemaCreate>
