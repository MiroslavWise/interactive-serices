import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schemaCodeVerification = z.object({
  code: z.string().trim().length(6, { message: "Должно быть 6 символов" }).default(""),
})
export const resolverCodeVerification = zodResolver(schemaCodeVerification)
export type TSchemaCodeVerification = z.infer<typeof schemaCodeVerification>
