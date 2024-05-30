import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const schemaForgotPassword = z.object({
  email: z.string().email({ message: "Такой почты не существует" }).default(""),
})

export const resolverForgotPassword = zodResolver(schemaForgotPassword)
export type TSchemaForgotPassword = z.infer<typeof schemaForgotPassword>
