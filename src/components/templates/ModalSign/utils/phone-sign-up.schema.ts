import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { agree, marketing } from "./agree.schema"

const regex = /[^\d]/g

const schemaPhoneSignUp = z.object({
  phone: z.string().trim().min(10, { message: "Номер телефона состоит из 10-12 цифр" }).default(""),
  agree: agree,
  marketing: marketing,
})
export const resolverPhoneSignUp = zodResolver(schemaPhoneSignUp)
export type TSchemaPhoneSignUp = z.infer<typeof schemaPhoneSignUp>
