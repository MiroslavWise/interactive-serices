import { z } from "zod"

/**
 * Согласие на обработку персональных данных `agree`
 */
export const agree = z.boolean().default(false)

/**
 * Согласие на получение маркетинговых рассылок `marketing`
 */
export const marketing = z.boolean().default(false)

export const objectAgree = z.object({
  agree: agree,
  marketing: marketing,
})

export type TTypeAgree = z.infer<typeof objectAgree>
