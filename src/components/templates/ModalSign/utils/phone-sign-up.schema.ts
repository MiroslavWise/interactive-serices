import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const regex = /[^\d]/g

export const schemaPhoneSignUp = z.object({
  phone: z
    .string()
    .trim()
    .min(10, { message: "Номер телефона состоит из 10-12 цифр" })
    .default(""),
    marketing: z.boolean().default(false),
    agree: z.boolean().default(false),
})
export const resolverPhoneSignUp = zodResolver(schemaPhoneSignUp)
export type TSchemaPhoneSignUp = z.infer<typeof schemaPhoneSignUp>
