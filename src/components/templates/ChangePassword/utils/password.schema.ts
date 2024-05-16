import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { schemaPassword } from "../../ModalSign/utils/password.schema"

export const schemaPasswordOld = z.object({
  oldPassword: z.string().min(1, { message: "Введите старый пароль" }).default(""),
})

export const schemaPasswordAndOld = z.intersection(schemaPasswordOld, schemaPassword).refine((data) => data.password === data.repeat, {
  path: ["repeat"],
  message: "Пароли не совпадают",
})

export const resolverPassword = zodResolver(schemaPasswordAndOld)
export type TSchemaPassword = z.infer<typeof schemaPasswordAndOld>
export type TKeysPassword = keyof TSchemaPassword
