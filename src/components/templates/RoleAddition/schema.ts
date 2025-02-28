import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  roles: z.array(z.number()).default([]),
})

export type TSchemaRoleUser = z.infer<typeof schema>
export const resolverSchemaRoleUser = zodResolver(schema)
