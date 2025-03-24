import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { ETitleRole } from "@/services/roles/types"

const schema = z.object({
  roles: z.array(z.nativeEnum(ETitleRole)).default([]),
})

export type TSchemaRoleUser = z.infer<typeof schema>
export const resolverSchemaRoleUser = zodResolver(schema)
