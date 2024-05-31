import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const schemaForgotPassword = z.object({
  email: z
    .string()
    .min(1, { message: "Поле не может оставаться незаполненным" })
    .email({ message: "Email не соответствует формату `email-address@mail.com`" })
    .default(""),
})

export const resolverForgotPassword = zodResolver(schemaForgotPassword)
export type TSchemaForgotPassword = z.infer<typeof schemaForgotPassword>
