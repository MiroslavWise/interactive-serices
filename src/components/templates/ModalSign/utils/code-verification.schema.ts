import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const schemaCodeVerification = z.object({
  code: z.string().length(6, { message: "Должно быть 6 символов" }).trim().default(""),
})
export const resolverCodeVerification = zodResolver(schemaCodeVerification)
export type TSchemaCodeVerification = z.infer<typeof schemaCodeVerification>
