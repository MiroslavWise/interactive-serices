import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const emailZod = z
  .string()
  .min(1, { message: "Поле не может оставаться незаполненным" })
  .email({ message: "Такой почты не существует" })
  .default("")

const schemaEmailSignIn = z.object({
  email: emailZod,
  password: z
    .string()
    .min(1, { message: "Поле не может оставаться незаполненным" })
    // .min(6, { message: "Введите минимум 6 символов для пароля" })
    .default(""),
})
export const resolverEmailSignIn = zodResolver(schemaEmailSignIn)
export type TSchemaEmailSignIn = z.infer<typeof schemaEmailSignIn>
