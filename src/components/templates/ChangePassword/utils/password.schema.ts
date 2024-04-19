import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const passwordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)

const stringPassword = z.string().min(6, { message: "Введите минимум 6 символов для пароля" })

export const schemaPassword = z
  .object({
    oldPassword: stringPassword,
    password: stringPassword.regex(passwordValidation, {
      message: "Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву, одну цифру и один специальный символ",
    }),
    repeat: stringPassword.regex(passwordValidation, {
      message: "Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву, одну цифру и один специальный символ",
    }),
  })
  .refine((data) => data.password === data.repeat, {
    path: ["repeat"],
    message: "Пароли не совпадают",
  })

export const resolverPassword = zodResolver(schemaPassword)
export type TSchemaPassword = z.infer<typeof schemaPassword>
export type TKeysPassword = keyof TSchemaPassword
