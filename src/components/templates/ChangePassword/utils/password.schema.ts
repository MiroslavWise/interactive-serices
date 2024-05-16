import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const passwordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/)
const passwordValidation_a_z = new RegExp(/^(?=.*?[a-z]).{1,}$/)
const passwordValidation_A_Z = new RegExp(/^(?=.*?[A-Z]).{1,}$/)
const passwordValidation_0_9 = new RegExp(/^(?=.*?[0-9]).{1,}$/)

const stringPassword = z.string().min(6, { message: "Введите минимум 6 символов для пароля" })

export const schemaPassword = z
  .object({
    oldPassword: stringPassword,
    password: stringPassword
      .regex(passwordValidation_a_z, { message: "Нужен символ в нижнем регистре [a-z]" })
      .regex(passwordValidation_A_Z, { message: "Нужен символ в верхнем регистре [A-Z]" })
      .regex(passwordValidation_0_9, { message: "Нужна цифра [0-9]" })
      .regex(passwordValidation, { message: "Пароль недостаточно сложный" })
      .default(""),
    repeat: z.string().default(""),
  })
  .refine((data) => data.password === data.repeat, {
    path: ["repeat"],
    message: "Пароли не совпадают",
  })

export const resolverPassword = zodResolver(schemaPassword)
export type TSchemaPassword = z.infer<typeof schemaPassword>
export type TKeysPassword = keyof TSchemaPassword
