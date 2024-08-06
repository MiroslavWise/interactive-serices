import { z } from "zod"

/**
 * Согласие на обработку персональных данных `agree`
 */
export const agree = z.boolean().default(false)

/**
 * Согласие на получение маркетинговых рассылок `marketing`
 */
export const marketing = z.boolean().default(false)

const objectAgree = z.object({
  agree: agree,
  marketing: marketing,
})
