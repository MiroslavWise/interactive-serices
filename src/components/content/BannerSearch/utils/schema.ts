import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schemaSearch = z.object({
  input: z.string().default(""),
})

export type TSchemaSearch = z.infer<typeof schemaSearch>
export const resolverSchemaSearch = zodResolver(schemaSearch)
