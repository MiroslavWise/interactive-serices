import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const schemaEmailSignIn = z.object({
  email: z.string().email({ message: "Не валидный Email" }).default(""),
  password: z.string().min(6, { message: "Введите минимум 6 символов для пароля" }).default(""),
})
export const resolverEmailSignIn = zodResolver(schemaEmailSignIn)
export type TSchemaEmailSignIn = z.infer<typeof schemaEmailSignIn>
