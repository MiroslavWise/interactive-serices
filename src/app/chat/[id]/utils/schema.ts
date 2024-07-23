import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  text: z.string().default(""),
})

export type TTypeSchema = z.infer<typeof schema>
export const resolver = zodResolver(schema)
