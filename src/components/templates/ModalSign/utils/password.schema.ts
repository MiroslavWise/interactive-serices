import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const passwordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)

export const schemaPassword = z
  .object({
    password: z.string().min(6, { message: "Введите минимум 6 символов" }).default(""),
    repeat_password: z.string().min(6, { message: "Введите минимум 6 символов" }).default(""),
  })
  .refine((data) => data.password === data.repeat_password, {
    path: ["repeat_password"],
    message: "Пароли не совпадают",
  })

export const resolverPassword = zodResolver(schemaPassword)
export type TValidateSchemaPassword = z.infer<typeof schemaPassword>
