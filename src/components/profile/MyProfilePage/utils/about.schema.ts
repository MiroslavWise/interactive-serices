import { z, string } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schemaAbout = z.object({
  text: string()
    .trim()
    .min(3, { message: "Не менее 3-х символов в описании вашего профиля" })
    .max(512, { message: "Достигнут лимит символов" })
    .default(""),
})

export const resolverAbout = zodResolver(schemaAbout)
export type TValidateSchemaAbout = z.infer<typeof schemaAbout>
