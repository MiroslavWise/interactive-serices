import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const nullableStringGender = z.enum(["m", "f"], {
  errorMap: () => ({
    message: "Выберите пол",
  }),
})
const stringMinThree = (message: string, messageMax: string, regex: RegExp) =>
  z
    .string({ errorMap: () => ({ message }) })
    .trim()
    .min(1, { message })
    .min(2, { message })
    .max(32, { message: messageMax })
    .regex(regex, {
      message: "Не верный формат поля, допускаются только буквы и один дефис",
    })

const schemaUpdateForm = z.object({
  firstName: stringMinThree("Минимум 2 символа в имени", "Максимум 32 символа в имени", /^[a-zA-Zа-яА-Яёй\-]+$/),
  lastName: z
    .string()
    .regex(/^[a-zA-Zа-яА-Яёй\-]+$/, {
      message: "Не верный формат поля, допускаются только буквы и один дефис",
    })
    .default(""),
  // username: stringMinThree("Минимум 2 символа в никнейме", "Максимум 32 символа в никнейме", /^[a-zA-Zа-яА-Яёй\-0-9_]+$/),
  username: z
    .string()
    .regex(/^[a-zA-Zа-яА-Яёй\-0-9_]+$/, { message: "Не верный формат поля, допускаются только буквы и один дефис" })
    .default(""),
  gender: nullableStringGender,
})

export type TGenderForm = z.infer<typeof nullableStringGender>
export const resolverUpdateForm = zodResolver(schemaUpdateForm)
export type TSchemaUpdateForm = z.infer<typeof schemaUpdateForm>
