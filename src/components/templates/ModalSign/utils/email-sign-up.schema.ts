import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const schemaEmailSignUp = z.object({
  email: z.string().email({ message: "Не валидный Email" }),
  marketing: z.boolean().default(false),
  agree: z.boolean().default(false),
})
export const resolverEmailSignUp = zodResolver(schemaEmailSignUp)
export type TSchemaEmailSignUp = z.infer<typeof schemaEmailSignUp>
