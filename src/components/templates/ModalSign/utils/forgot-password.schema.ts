import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const schemaForgotPassword = z.object({
  email: z.string().email({ message: "Не валидный Email" }).default(""),
})

export const resolverForgotPassword = zodResolver(schemaForgotPassword)
export type TSchemaForgotPassword = z.infer<typeof schemaForgotPassword>
