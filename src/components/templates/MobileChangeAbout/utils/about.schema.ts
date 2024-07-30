import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const LIMIT_LENGTH_ABOUT = 512
export const MIN_LENGTH_ABOUT = 1

const aboutSchema = z.object({
  about: z
    .string()
    .trim()
    .min(MIN_LENGTH_ABOUT, { message: "Поле не может оставаться пустым" })
    .max(LIMIT_LENGTH_ABOUT, { message: "Введите не более 512 символов" })
    .default(""),
})

export type TAboutSchema = z.infer<typeof aboutSchema>
export const resolverAboutSchema = zodResolver(aboutSchema)
