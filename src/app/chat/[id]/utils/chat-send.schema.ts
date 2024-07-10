import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export const schemaChatSend = z.object({
  text: z.string().min(1, { message: "Введите не менее одного символа" }).max(1024, { message: "Не более 1024 символов" }).default(""),
  file: z.object({
    file: z.array(z.any()).default([]),
    string: z.array(z.string()).default([]),
  }),
})

export const resolverChatSend = zodResolver(schemaChatSend)
export type TSchemaChatSend = z.infer<typeof schemaChatSend>
