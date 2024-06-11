import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { ETypeReason } from "@/services/barters/types"

export const MAX_LENGTH_TEXT_OTHER = 400

const schemaReasonBarters = z
  .object({
    type: z.nativeEnum(ETypeReason).default(ETypeReason["found-specialist"]),
    text: z.string().optional().default(""),
  })
  .refine(({ type, text }) => type === ETypeReason.other && text.trim().length > 0, {
    path: ["text"],
    message: "Не оставляйте это поле пустым",
  })
  .refine(({ type, text }) => type === ETypeReason.other && text.trim().length < MAX_LENGTH_TEXT_OTHER - 1, {
    path: ["text"],
    message: "Достигнут лимит символов",
  })

export const resolverReasonBarters = zodResolver(schemaReasonBarters)
export type TReasonBarters = z.infer<typeof schemaReasonBarters>
