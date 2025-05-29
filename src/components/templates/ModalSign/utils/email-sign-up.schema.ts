import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { agree, marketing } from "./agree.schema"

const schemaEmailSignUp = z.object({
  email: z.string().min(1, { message: "Поле не может оставаться незаполненным" }).email({ message: "Такой почты не существует" }),
  agree: agree,
  marketing: marketing,
})
export const resolverEmailSignUp = zodResolver(schemaEmailSignUp)
export type TSchemaEmailSignUp = z.infer<typeof schemaEmailSignUp>
