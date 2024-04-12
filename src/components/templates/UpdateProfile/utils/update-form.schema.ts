import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const nullableStringGender = z.nullable(z.literal("m").or(z.literal("f")))
const stringMinThree = (message: string, messageMax: string, regex: RegExp) =>
  z.string().trim().min(3, { message }).max(32, { message: messageMax }).regex(regex, {
    message: "Не верный формат поля",
  })

export const schemaUpdateForm = z.object({
  firstName: stringMinThree("Минимум 3 символа в имени", "Максимум 32 символа в имени", /^[a-zA-Zа-яА-Яёй\-]+$/),
  lastName: stringMinThree("Минимум 3 символа в фамилии", "Максимум 32 символа в фамилии", /^[a-zA-Zа-яА-Яёй\-]+$/),
  username: stringMinThree("Минимум 3 символа в никнейме", "Максимум 32 символа в никнейме", /^[a-zA-Zа-яА-Яёй\-0-9_]+$/),
  gender: nullableStringGender,
})

export const resolverUpdateForm = zodResolver(schemaUpdateForm)
export type TSchemaUpdateForm = z.infer<typeof schemaUpdateForm>
