import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { emailZod } from "../ModalSign/utils/email-sign-in.schema"
import { schema as schemaPassword } from "../ModalSign/utils/password.schema"

const schemaEmail = z.object({
  email: emailZod,
})

const schema = z.intersection(schemaEmail, schemaPassword).refine((data) => data.password === data.repeat, {
  path: ["repeat"],
  message: "Пароли не совпадают",
})

export const resolverEmailPassword = zodResolver(schema)
export type TValidateSchemaEmailPassword = z.infer<typeof schema>
