import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const regex = /[^\d]/g

export const schemaPhoneSignIn = z.object({
  phone: z
    .string()
    .trim()
    .min(11, { message: "Номер телефона состоит из 11 цифр" })
    .length(11, { message: "Номер телефона состоит из 11 цифр" })
    .default("")
    .refine((data) => regex.test(data), { message: "Не верный формат номера" }),
})
export const resolverPhoneSigIn = zodResolver(schemaPhoneSignIn)
export type TSchemaPhoneSignIn = z.infer<typeof schemaPhoneSignIn>
