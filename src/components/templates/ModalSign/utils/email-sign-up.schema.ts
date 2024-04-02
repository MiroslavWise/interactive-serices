import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const schemaEmailSignUp = z.object({
  email: z.string().email({ message: "Не валидный Email" }),
  checkbox: z.boolean().default(false),
  checkbox_personal_data: z.boolean().default(false),
})
export const resolverEmailSignUp = zodResolver(schemaEmailSignUp)
export type TSchemaEmailSignUp = z.infer<typeof schemaEmailSignUp>
