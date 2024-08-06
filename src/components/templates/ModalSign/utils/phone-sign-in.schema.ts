import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const regex = /[^\d]/g

const schemaPhoneSignIn = z.object({
  phone: z.string().trim().min(10, { message: "Номер телефона состоит из 10-12 цифр" }).default(""),
})
export const resolverPhoneSigIn = zodResolver(schemaPhoneSignIn)
export type TSchemaPhoneSignIn = z.infer<typeof schemaPhoneSignIn>
