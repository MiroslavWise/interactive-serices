import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { agree, marketing } from "./agree.schema"

export const schemaEmailSignUp = z.object({
  email: z.string().email({ message: "Не валидный Email" }),
  agree: agree,
  marketing: marketing,
})
export const resolverEmailSignUp = zodResolver(schemaEmailSignUp)
export type TSchemaEmailSignUp = z.infer<typeof schemaEmailSignUp>
